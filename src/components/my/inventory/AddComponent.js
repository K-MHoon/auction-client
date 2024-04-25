import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const textFormName = {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
};

const textFormStyle = { fontSize: "15px", fontWeight: "bold" };

const AddComponent = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const yesButton = () => {
        setShow(false);
        navigate({ pathname: "" });
    };

    const closeButton = () => setShow(false);

    const handleShow = (content) => {
        setShow(true);
    };

    return (
        <>
            <Row className="border border-5 rounded-5 p-4 border-secondary">
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        물품 명
                    </Col>
                    <Col md={7}>
                        <Form.Control type="text" style={textFormStyle} />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        물품 유형
                    </Col>
                    <Col md={7}>
                        <Form.Control type="text" style={textFormStyle} />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        설명
                    </Col>
                    <Col md={7}>
                        <Form.Control type="text" style={textFormStyle} />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        물품 이미지
                    </Col>
                    <Col md={7}>
                        <Form.Control type="text" style={textFormStyle} />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        서류 등록
                    </Col>
                    <Col md={7}>
                        <Form.Control type="text" style={textFormStyle} />
                    </Col>
                </Row>
            </Row>
            <Row className="pt-4 text-end">
                <Col>
                    <Button className="primary" onClick={() => handleShow()}>
                        등록신청하기
                    </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={closeButton}>
                <Modal.Header closeButton>
                    <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>물품 등록을 신청하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={yesButton}>
                        예
                    </Button>
                    <Button variant="secondary" onClick={closeButton}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddComponent;
