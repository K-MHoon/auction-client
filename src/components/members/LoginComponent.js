import React from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

const LoginComponent = () => {
    return (
        <Container
            md="auto"
            style={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                width: "800px",
                height: "200px",
            }}
        >
            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "50px",
                    borderRadius: "35px",
                    boxShadow: "0 45px 63px rgba(0, 0, 0, 0.7)",
                }}
            >
                <Col>
                    <Row className="justify-content-md-end">
                        <Col md={4}>
                            <Form.Label
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                }}
                            >
                                아이디
                            </Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-md-end mt-2">
                        <Col md={4}>
                            <Form.Label
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                }}
                            >
                                비밀번호
                            </Form.Label>
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md="auto" className="text-center p-1">
                    <Button
                        variant="primary"
                        size="lg"
                        block
                        style={{ height: "100%" }}
                    >
                        로그인
                    </Button>
                </Col>
                <Col md="auto" className="text-center p-1">
                    <Button
                        variant="secondary"
                        size="lg"
                        block
                        style={{ height: "100%" }}
                    >
                        회원가입
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginComponent;
