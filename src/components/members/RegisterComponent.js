import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerPost } from "../../api/memberApi";

const initState = {
    email: "",
    name: "",
    password: "",
};

const RegisterComponent = () => {
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState(initState);

    const handleChange = (e) => {
        registerForm[e.target.name] = e.target.value;
        setRegisterForm({ ...registerForm });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerPost(registerForm).then((data) => {
            console.log(data);

            if (data.error) {
                alert("회원가입에 실패했습니다.");
            } else {
                alert("회원가입에 성공했습니다.");
                navigate({ pathname: "/member/login" }, { replace: false });
            }
        });
    };

    return (
        <Container
            md="auto"
            style={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                width: "800px",
                height: "500px",
            }}
        >
            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    textAlign: "center",
                    padding: "50px",
                    borderRadius: "35px",
                    // border: "10px solid white",
                    backgroundColor: "rgba(22, 10, 10, 0.7)",
                }}
            >
                <Form.Label
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "40px",
                    }}
                >
                    회원가입
                </Form.Label>
                <Form.Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "20px",
                        marginTop: -10,
                        paddingBottom: 30,
                    }}
                >
                    (register)
                </Form.Text>
                <Row className="justify-content-md-end p-3">
                    <Col md={2}>
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
                    <Col md={10}>
                        <Form.Control
                            type="email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </Col>
                </Row>

                <Row className="justify-content-md-end p-3">
                    <Col md={2}>
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
                    <Col md={10}>
                        <Form.Control
                            type="password"
                            name="password"
                            value={registerForm.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </Col>
                </Row>

                <Row className="justify-content-md-end p-3">
                    <Col md={2}>
                        <Form.Label
                            style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "20px",
                            }}
                        >
                            이름
                        </Form.Label>
                    </Col>
                    <Col md={10}>
                        <Form.Control
                            type="text"
                            name="name"
                            value={registerForm.name}
                            onChange={handleChange}
                            placeholder="Name"
                        />
                    </Col>
                </Row>

                <Row className="pt-5">
                    <Button
                        md="auto"
                        variant="success"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        전송하기
                    </Button>
                </Row>
            </Row>
        </Container>
    );
};

export default RegisterComponent;
