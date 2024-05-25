import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { historyAtom } from '../lib/atom';
import {moneyAtom} from "../lib/atom"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import React from 'react'; 
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRouter } from 'next/router';

export default function Top() { 
    const router = useRouter();
    const [history, addHistory] = useAtom(historyAtom);
    const [isClient, setIsClient] = useState(false);
    const [money, addMoney] = useAtom(moneyAtom);

    useEffect(() => {
        // Want to check if the client is logged in or not
        setIsClient(true);
    }, []);

    const logout = async () => {
        localStorage.removeItem('token')
        router.push('/')
    }

    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="navbar-dark bg-dark"> 
                    <Container fluid>
                        <Navbar.Brand as={Nav.Link} onClick={() => router.push('/')}>Mini Quest</Navbar.Brand>
                        {isClient && localStorage.getItem('token') && <Navbar.Text as={Nav.Link} onClick={() => router.push('/worldPage')}>Play</Navbar.Text>}
                        {isClient && localStorage.getItem('token') && <Navbar.Text>${money}</Navbar.Text> }
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className="navbar-dark bg-dark mb-3"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} style={{color: "white"}}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link onClick={() => router.push('/')}><b>Home</b></Nav.Link>
                                    <Nav.Link onClick={() => router.push('/search/any')}><b>Shop</b></Nav.Link>
                                    {isClient && localStorage.getItem('token') 
                                        && <Nav.Link onClick={() => router.push('/Wishlist')}><b>Wishlist</b></Nav.Link>}
                                    {isClient && localStorage.getItem('token') 
                                        && <Nav.Link onClick={() => router.push('/Inventory')}><b>Inventory</b></Nav.Link>}
                                    <NavDropdown
                                        title="History"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        {history && history.length > 0 &&
                                            history.map((val, key) => (
                                                <div key={key}>
                                                    <NavDropdown.Item onClick={() => router.push(`/details/${val}`)}>{val}</NavDropdown.Item>
                                                    <NavDropdown.Divider />
                                                </div>
                                            ))}
                                    </NavDropdown>
                                </Nav>
                                <br/>
                                {isClient && localStorage.getItem('token') && 
                                    <Button variant="outline-danger" onClick={logout}>Logout</Button>}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}
