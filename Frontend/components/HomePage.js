import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import styles from "../styles/Style.module.css";

export default function HomePage() {
    const router = useRouter();
    const [instructions, setInstructions] = useState("");

    const handleLogin = () => {
        router.push('/login');
    };

    const handleRegister = () => {
        router.push('/register');
    };

    const showInstructions = () => {
        if (instructions) {
            setInstructions("");
        } else {
            setInstructions("Navigate with WASD. Blue circle: player. Black tiles: walls. Red tile: enemy. Combat is turn-based until either yours or their HP reaches 0. Green box: new room. Brown-red box: chest with items.");
        }
    };

    return (
        <div className={styles['container']}>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <Button variant="primary" size="lg" className="mb-2" onClick={handleLogin}>
                    Login
                </Button>
                <Button variant="primary" size="lg" style={{ marginTop: "15px" }} onClick={handleRegister}>
                    Register
                </Button>
                <br />
                <Button variant="primary" size="lg" style={{ marginTop: "15px" }} onClick={showInstructions}>
                    Instructions
                </Button>
                <br />
                <p>{instructions}</p>
            </div>
        </div>
    );
}
