import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./BasicMenu.css";
import { Link, useNavigate } from "react-router-dom";

const BasicMenu = () => {
    const [loginState, useLoginState] = useState({ isLogin: true });
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand
                    className="fw-bold text-primary"
                    onClick={() => navigate({ pathname: "/" })}
                >
                    SHIBA AUCTION
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto custom-nav">
                        <Nav.Link
                            onClick={() =>
                                navigate({ pathname: "/my/inventory" })
                            }
                        >
                            인벤토리
                        </Nav.Link>
                        <Nav.Link
                            onClick={() =>
                                navigate({ pathname: "/my/auction/list" })
                            }
                        >
                            내 경매
                        </Nav.Link>
                        <Nav.Link
                            onClick={() => navigate({ pathname: "/coupon" })}
                        >
                            경매 쿠폰 구매
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default BasicMenu;
