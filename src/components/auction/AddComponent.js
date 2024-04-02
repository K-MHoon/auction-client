import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

const textFormName = {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
};

const textFormStyle = { fontSize: "15px", fontWeight: "bold" };

const AddComponent = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (content) => {
        setShow(true);
    };

    return (
        <>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    제목
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
                    물품 명
                </Col>
                <Col md={7}>
                    <Form.Control type="text" style={textFormStyle} />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    시작 금액
                </Col>
                <Col md={7}>
                    <Form.Control type="text" style={textFormStyle} />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    시작 시간
                </Col>
                <Col md={7}>
                    <Form.Control type="text" style={textFormStyle} />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    종료 시간
                </Col>
                <Col md={7}>
                    <Form.Control type="text" style={textFormStyle} />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    최소 금액
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
                    이미지 등록
                </Col>
                <Col md={7}>
                    <Form.Control type="text" style={textFormStyle} />
                </Col>
            </Row>
            <Row className="m-2 p-4 text-end">
                <Col>
                    <Button className="primary" onClick={() => handleShow()}>
                        등록하기
                    </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>물품을 등록하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        예
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddComponent;
