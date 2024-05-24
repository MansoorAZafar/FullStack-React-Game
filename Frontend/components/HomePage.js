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
        setInstructions("Navigate the 2D grid with WASD, battle enemies, and find treasures in this MERN stack game. Buy items, manage inventory, and Wishlist.");
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
                <Button variant="primary" size="lg" style={{ marginTop: "15px" }} onClick={showInstructions}>
                    Instructions
                </Button>
                <br/>
                <p>{instructions}</p>
            </div>
        </div>
    );
}
