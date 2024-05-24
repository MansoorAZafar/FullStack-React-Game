require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { use } = require('passport');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
    },
    password: String,
    email: String,
    money: Number,
    inventory: Array,
    wishlist: Array,
});

let User;

async function initialize()
{
    return new Promise(function (resolve, reject) {
        //process.env.MONGODB breaks it on cyclic ????? . _ .
        let db = mongoose.createConnection(process.env.MONGODB);
        db.on('error', (err)=>{reject(err)}); // reject the promise with the provided error});
        db.once('open', ()=>{
            User = db.model("users", userSchema);
            resolve();
        });
    });
}

async function registerUser(userData)
{
    console.log(`\n--------\nRegisterUser occured: UserData: ${userData}\n-------`)
    return new Promise(function (resolve, reject) {
        bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
            // TODO: Store the resulting "hash" value in the DB
            userData.password = hash;
            userData.money = 0;
            const newUser = new User(userData);
            newUser.save().then(() => {
                resolve();
            }).catch(err => {
                if(err == 11000){
                    reject("User Name already taken");
                }else {
                    reject("There was an error creating the user: " + err);
                }
            })
        }).catch(err=>{
                reject("There was an error encrypting the password"); // Show any errors that occurred during the process
        });
    });
}

//Takes in:
/*
* username
* password
*/
async function checkUser(userData)
{
    return new Promise(function (resolve,reject) {
        User.find({userName: userData.userName})
        .exec().then((user) => {
            if(!user[0]){
                reject("Unable to find user: " + userData.userName);
            } else {

                bcrypt.compare(userData.password, user[0].password).then((result) => {
                    if(result)
                    {
                        resolve(user[0]);
                    } else{
                        reject("Incorrect Password for user: " + userData.userName);
                    }
                });
            }
        }).catch((err) => {
            reject("User not found");
        })
    });
}


//Takes in:
/*
* userName
* wishlist []
*/
async function addFavourites(userData) {
    return new Promise(function (resolve,reject) {
        User.find({userName: userData.userName})
        .exec().then((user) => {
            if(!user[0]) reject("Unable to find user: " + userData.userName);
            else {
                const hasNameInWishlist = user[0].wishlist.some(item => item.name === userData.wishlist.name);
                if (hasNameInWishlist) {
                    reject("Item already exists in the wishlist");
                } else {
                    user[0].wishlist.push(userData.wishlist)
                    User.updateOne({userName: user[0].userName}, {$set: {wishlist: user[0].wishlist}})
                    .exec().then(() => {
                        resolve(user[0])
                    }).catch((err) => {
                        reject("There was an error verifying the user: " + err);
                    });
                }                
            }
        }).catch((err) => {
            reject("User not found");
        })
    });
}

async function updateFavorites(userData) {
    return new Promise(function (resolve, reject) {
        User.find({userName: userData.userName})
            .exec().then((user) => {
                if (!user[0]) reject("Unable to find user: " + userData.userName);
                else {
                    // Filter out the item with the specified id
                    user[0].wishlist = user[0].wishlist.filter((item) => item.id !== userData.pendingChanges.id);
                    User.updateOne({ userName: user[0].userName }, { $set: { wishlist: user[0].wishlist } })
                        .exec()
                        .then(() => {
                            resolve(user[0]);
                        })
                        .catch((err) => {
                            reject("There was an error updating the user: " + err);
                        });
                }
            })
            .catch((err) => {
                reject("User not found");
            });
    });
}

async function buyItem(userData) {
    return new Promise((resolve, reject) => {
        User.find({userName: userData.userName})
        .exec().then((user) => {
            if (!user[0]) {
                reject("Unable to find user: " + userData.userName);
            } else {
                if(user[0].money < userData.cost) {
                    reject("Not enough funds to buy item...");
                } else {
                    user[0].money -= userData.cost;
                    user[0].inventory.push(userData.item)
                    User.updateOne({ userName: user[0].userName }, 
                        { $set: { money: user[0].money, inventory: user[0].inventory } })
                        .exec()
                        .then(() => {
                            resolve(user[0]);
                        })
                        .catch((err) => {
                            reject("There was an error updating the user: " + err);
                        });
                }
            }
        }).catch((er) => {
            reject(er);
        })
    })
}

async function getWishlist(userName) {
    return new Promise((resolve, reject) => {
        User.find({userName: userName})
        .exec().then((user) => {
            if (!user[0]) {
                reject("Unable to find user: " + userName);
            } else {
                resolve(user[0].wishlist)
            }
        }).catch((er) => {
            reject(er)
        })
    })
}

async function getInventory(userName) {
    return new Promise((resolve, reject) => {
        User.find({userName: userName})
        .exec().then((user) => {
            if (!user[0]) {
                reject("Unable to find user: " + userName);
            } else {
                resolve(user[0].inventory)
            }
        }).catch((er) => {
            reject(er)
        })
    })
}
async function getMoney(userName) {
    return new Promise((resolve, reject) => {
        User.find({userName: userName})
        .exec().then((user) => {
            if (!user[0]) {
                reject("Unable to find user: " + userName);
            } else {
                resolve(user[0].money)
            }
        }).catch((er) => {
            reject(er)
        })
    })
}

async function addMoney(userData) {
    return new Promise(function (resolve,reject) {
        User.find({userName: userData.userName})
        .exec().then((user) => {
            if(!user[0]) reject("Unable to find user: " + userData.userName);
            else {
                user[0].money += userData.money;
                User.updateOne({userName: user[0].userName}, {$set: {money: user[0].money}})
                .exec().then(() => {
                    resolve(user[0])
                }).catch((err) => {
                    reject("There was an error verifying the user: " + err);
                });                
            }
        }).catch((err) => {
            reject("User not found");
        })
    });
} 

module.exports = { initialize, registerUser, checkUser, addFavourites, 
                   updateFavorites, buyItem, getWishlist, getInventory,
                   getMoney, addMoney }