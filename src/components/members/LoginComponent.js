import React, { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
    email: "",
    pw: "",
};

const LoginComponent = () => {
    const [loginParam, setLoginParam] = useState({ ...initState });

    const { doLogin, moveToPath } = useCustomLogin();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;
        setLoginParam({ ...loginParam });
    };

    const handleClickLogin = (e) => {
        doLogin(loginParam).then((data) => {
            if (data.error) {
                alert("이메일 또는 비밀번호를 다시 확인하세요");
            } else {
                alert("로그인 성공");
                moveToPath("/", true);
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
                height: "250px",
            }}
        >
            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    padding: "50px",
                    borderRadius: "35px",
                    // border: "10px solid white",
                    backgroundColor: "rgba(22, 10, 10, 0.7)",
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
                                name="email"
                                value={loginParam.email}
                                onChange={handleChange}
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
                                name="pw"
                                value={loginParam.pw}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col md="auto" className="text-center p-1">
                    <Button
                        variant="primary"
                        size="lg"
                        style={{ height: "100%" }}
                        onClick={handleClickLogin}
                    >
                        로그인
                    </Button>
                </Col>
                <Col md="auto" className="text-center p-1">
                    <Button
                        variant="secondary"
                        size="lg"
                        style={{ height: "100%" }}
                        onClick={() => moveToPath("/member/register", false)}
                    >
                        회원가입
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginComponent;
