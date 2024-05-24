import { Form, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Top from "../components/Top";
import styles from "../styles/Style.module.css";

export default function Login(props) {
  const [warning, setWarning] = useState("");
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem('token')) router.push('/worldPage')
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      
      if (res.ok) {
          const data = await res.json();
          localStorage.setItem('token', data.token); // Store token in local storage
          router.push('/worldPage'); // Redirect to dashboard or any other protected route
      } else {
          setWarning('User not found. Please try again.');
      }
    } catch {
      setWarning('User not found. Please try again.');
    }
  };

  return (
    <div>
      <Top/>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Login</h2>
            <Form onSubmit={handleLogin}>
              <Form.Group> <br/><br/>
                <Form.Control required type="text" value={userName} placeholder="Username" onChange={e => setUser(e.target.value)} />
              </Form.Group> <br/>
              <Form.Group>
                <Form.Control required type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </Form.Group><br/>
              {warning && (
                <Alert variant='danger'>
                  {warning}
                </Alert>
              )}<br/>
              <Button variant="primary" type="submit" className={styles.loginButton}>Login</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
