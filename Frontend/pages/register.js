import { Card, Alert, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import Top from "../components/Top"
import styles from "../styles/Style.module.css"

export default function Login(props) {

  const [warning, setWarning] = useState("");
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userName, password }),
      });
      
      if (res.ok) {
          const data = await res.json();
          localStorage.setItem('token', data.token); // Store token in local storage
          router.push('/login'); // Redirect to dashboard or any other protected route
      } else {
          setWarning('Username already exists. Please try again.');
      }
    } catch {
      setWarning('Registration is down... Please try again later');
    } 
  };

  return (
    <div>
      <Top/>
      <div className={styles.container}>
        <div className={styles.cardContainerRegister}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Register</h2>
            <Form onSubmit={handleLogin}>
              <br/>
              <Form.Group><br/>
                <Form.Control required type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group> <br/>
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
              <Button variant="primary" type="submit" className={styles.loginButton}>Register</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}