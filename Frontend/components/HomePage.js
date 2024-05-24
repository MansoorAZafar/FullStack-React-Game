import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router'
import styles from "../styles/Style.module.css"

export default function HomePage() {
    const router = useRouter()

    const handleLogin = () => {
        router.push('/login')
    }

    const handleRegister = () => {
        router.push('/register')
    }

    return (
        <div className={styles['container']}>
        <div className="d-flex justify-content-center flex-column align-items-center">
            <Button variant="primary" size="lg" className="mb-2" onClick={handleLogin}>
                Login
            </Button>
            <Button variant="primary" size="lg" style={{marginTop: "15px"}} onClick={handleRegister}>
                Register
            </Button>
        </div>
        </div>
    );
}
