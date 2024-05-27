import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import styles from "../styles/Style.module.css"
import {moneyAtom} from "../lib/atom"
import {useAtom} from "jotai"

export default function World() {

    const [money, addMoney] = useAtom(moneyAtom);
    const [amount, setAmount] = useState(0); // State variable to hold the amount

    // Define the size of the world grid
    const GRID_WIDTH = 9;
    const GRID_HEIGHT = 9;
    const router = useRouter();
    // Define the tile types
    const TILE_TYPES = {
    WALKABLE: 'walkable',
    WALL: 'wall',
    ENCOUNTER: 'encounter',
    ROOM1: 'ROOM1',
    ROOM2: 'ROOM2',
    chest: 'chest'
    };

    const [showPopup, setShowPopup] = useState(false);
    const [currGrid, setWorldGrid] = useState([[TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.ROOM1, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.ENCOUNTER, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL],])
    
    
        const chestGrid = [[TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL],
                       [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
                       [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.chest, TILE_TYPES.ROOM2, TILE_TYPES.WALL],
                       [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
                       [TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL]];

        const worldGrid = [[TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.ROOM1, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.ENCOUNTER, TILE_TYPES.WALKABLE, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALKABLE, TILE_TYPES.WALL],
        [TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL, TILE_TYPES.WALL],]
  

    // Define a Tile component to represent individual tiles
    const Tile = ({ type }) => {
        let backgroundColor;

        // Determine background color based on tile type
        switch (type) {
        case TILE_TYPES.WALKABLE:
        backgroundColor = 'white';
        break;
        case TILE_TYPES.ENCOUNTER:
        backgroundColor = 'red';
        break;
        case TILE_TYPES.ROOM1:
        backgroundColor = 'green'
        break;
        case TILE_TYPES.ROOM2:
        backgroundColor = 'green'
        break;
        case TILE_TYPES.chest:
        backgroundColor = 'rgb(113 63 18)'
        break;
        default:
        backgroundColor = 'black';
        }


        const tileStyle = {
            width: '40px',
            height: '40px',
            border: '1px solid black',
            backgroundColor: backgroundColor,
        };
        return <div style={tileStyle}></div>;
    };

    // Define the Player component
    const Player = ({ position }) => {
        const playerStyle = {
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'blue',
            position: 'absolute',
            top: `${position.y * 40}px`,
            left: `${position.x * 40}px`, 
        };
        return <div style={playerStyle}></div>;
    };
    // Define player position and set initial position
    const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });

    // Handle player movement
    const handleMove = (dx, dy) => {
        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;
    
        if (newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT && currGrid[newY][newX] === TILE_TYPES.WALKABLE) {
            setPlayerPosition({ x: newX, y: newY });
        }
        else if (newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT && currGrid[newY][newX] === TILE_TYPES.ENCOUNTER) {
            router.push('/battle');
        }
        else if (newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT && currGrid[newY][newX] === TILE_TYPES.ROOM1) {
            setPlayerPosition({ x: 1, y: 3 });
            setWorldGrid(chestGrid);
        }
        else if (newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT && currGrid[newY][newX] === TILE_TYPES.ROOM2) {
            setWorldGrid(worldGrid);
            setPlayerPosition({ x: 1, y: 1 });
        }
        else if (newX >= 0 && newX < GRID_WIDTH && newY >= 0 && newY < GRID_HEIGHT && currGrid[newY][newX] === TILE_TYPES.chest) {
            const amt = Math.floor(Math.random() * 5) + 1;
            setAmount(amt); // Set the amount before showing the popup
            setShowPopup(true);
        }
    };


    /*
useEffect(() => {
        if(!localStorage.getItem('token')) {
            router.push('/login')
        }
    }, []);

    */
    const Popup = () => {
        const handleExitClick = async () => {
            setShowPopup(false);
            const token = localStorage.getItem('token');
            fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/addMoney`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the JWT token in the headers
                    },
                    body: JSON.stringify({ money: amount }), // Use the already set amount
            });
            addMoney(money + amount);
        };
    
        return (
            <div className={styles['popupBackdrop']}>
                <div className={styles['popup']}>
                    <p>You got ${amount}!</p>
                    <button onClick={handleExitClick}>Close</button>
                </div>
            </div>
        );
    };


    // Handle key press events for player movement
    const handleKeyPress = (e) => {
        switch (e.key) {
          case 'w': // W key for up
            handleMove(0, -1);
            break;
          case 's': // S key for down
            handleMove(0, 1);
            break;
          case 'a': // A key for left
            handleMove(-1, 0);
            break;
          case 'd': // D key for right
            handleMove(1, 0);
            break;
          default:
            break;
        }
      };

    // Add key press event listener
    React.useEffect(() => {
        
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [playerPosition]); // Re-add event listener when player position changes

    return (
    <div className={styles['container']}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '92vh' }}>
        <div style={{ position: 'relative', border: '2px solid black', display: 'flex', flexDirection: 'column' }}>
        
            {currGrid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((tileType, colIndex) => (
                <Tile key={colIndex} type={tileType} />
                ))}
            </div>
            ))}
            <Player position={playerPosition} />
        </div>
        {showPopup && <Popup />}
    </div>
    </div>
    );

 
}
