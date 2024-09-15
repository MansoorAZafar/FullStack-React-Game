require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dataService = require("./auth-server.js");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

// JSON Web Token Setup
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

// Configure its options
let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.SECRETKEY,
};

// IMPORTANT - this secret should be a long, unguessable string
// (ideally stored in a "protected storage" area on the web server).
// We suggest that you generate a random 50-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values 
        // that matches the request payload data
        next(null, { userName: jwt_payload.userName, 
            password: jwt_payload.password}); 
    } else {
        next(null, false);
    }
});

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello"); 
})

app.post("/api/register", (req,res)=>{
    dataService.registerUser(req.body).then(msg=>{
        res.json({message: msg});
    }).catch(msg=>{
        console.log('register failed: ', msg)
        res.status(422).json({message: msg});
    });
});

// Middleware to extract and decrypt JWT token
function jwtMiddleware(req, res, next) {
    // Extract JWT token from the request headers
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is in the "Authorization" header
    if (token) {
        // Decrypt JWT token to get the username
        jwt.verify(token, jwtOptions.secretOrKey, (err, decoded) => {
            if (err) {
                console.error('Error decoding JWT token:', err);
                return res.status(401).json({ message: 'Invalid or expired token' });
            }
            
            // Attach the username to the request object
            req.username = decoded.userName;
            next(); // Call the next middleware/route handler
        });
    } else {
        // No token found in the headers, proceed to the next middleware/route handler
        next();
    }
}

app.post("/api/buyItem", jwtMiddleware, (req, res) => {
    console.log('/api/buyItem')
    const userName = req.username; // Get the username from the request object
    const user = {userName: userName, item: req.body.item, cost: req.body.cost}
    dataService.buyItem(user)
    .then((msg) => {
        res.json({message: msg})
    }).catch(msg => {
        console.log('buying item failed: ', msg)
        res.status(422).json({message: msg});
    });
})

app.post("/api/addFav", jwtMiddleware, (req, res) => {
    console.log('/api/addFav')
    const userName = req.username; // Get the username from the request object
    const user = {userName: userName, wishlist: req.body.wishlist}
    dataService.addFavourites(user)
    .then((msg) => {
        res.json({message: msg})
    }).catch(msg => {
        console.log('adding favourite failed: ', msg)
        res.status(422).json({message: msg});
    });
});

app.post("/api/updateFavorites", jwtMiddleware, (req, res) => {
    console.log('/api/updateFavs')
    const userName = req.username; // Get the username from the request object
    const user = {userName: userName, pendingChanges: req.body.pendingChanges}
    dataService.updateFavorites(user)
    .then((msg) => {
        res.json({message: msg})
    }).catch(msg => {
        console.log('update favourite failed: ', msg)
        res.status(422).json({message: msg});
    });
});

app.post("/api/login", (req, res) => {
    dataService.checkUser(req.body)
        .then((user) => {

            let payload = { 
                userName: user.userName,
                password: user.password,
            };
            
            let token = jwt.sign(payload, jwtOptions.secretOrKey);

            res.json({ "message": "login successful", "token": token });
        }).catch((msg) => {
            console.log('login failed: ', msg)
            res.status(422).json({ "message": msg });
        });
});

app.get("/api/getWishlist", jwtMiddleware, (req, res) => {
    console.log('/api/getWishlist')
    const userName = req.username; // Get the username from the request object
    dataService.getWishlist(userName)
    .then((wishlist) => {
        res.json(wishlist)
    }).catch((msg) => {
        console.log('getwishlist failed: ', msg)
        res.status(422).json({ "message": msg });
    });
})

app.get('/api/getInventory', jwtMiddleware, (req, res) => {
    console.log('/api/getInventory')
    const userName = req.username; // Get the username from the request object
    dataService.getInventory(userName)
    .then((wishlist) => {
        res.json(wishlist)
    }).catch((msg) => {
        console.log('getInventory failed: ', msg)
        res.status(422).json({ "message": msg });
    });
})

app.get('/api/getMoney', jwtMiddleware, (req, res) => {
    console.log('/api/getMoney');
    const userName = req.username;
    dataServer.getMoney(userName)
    .then((amount) => {
        res.json(amount);
    }).catch((msg) => {
        console.log('getMoney failed: ', msg);
        res.status(422).json({"message": msg});
    })
})

app.post('/api/addMoney', jwtMiddleware, (req, res) => {
    console.log('/api/addMoney');
    const userName = req.username;
    const user = {userName: userName, money: req.body.money}
    dataService.addMoney(user)
    .then((msg) => {
        res.json({message: msg})
    }).catch(msg => {
        console.log('addMoney failed: ', msg)
        res.status(422).json({message: msg});
    });
})

app.use((req, res) => {
    res.status(404).end();
});

dataService.initialize().then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log("API listening on: " + HTTP_PORT);
    });
}).catch(err=>console.log(err))

