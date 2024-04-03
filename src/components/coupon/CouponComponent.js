import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import shiba from "../../images/shiba_coupon.png";
import "./CouponComponent.css";

const items = [
    {
        id: 1,
        count: 10,
        price: 100000,
        image: {
            width: "300spx",
            height: "170px",
            src: shiba,
        },
    },
    {
        id: 2,
        count: 100,
        price: 900000,
        image: {
            width: "300spx",
            height: "170px",
            src: shiba,
        },
    },
];

const CouponComponent = () => {
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (content) => {
        setModalContent(content);
        setShow(true);
    };

    return (
        <>
            <Row className="justify-content-md-end">
                <Col md="auto">
                    <h5 style={{ fontWeight: "bold" }}>내 보유 쿠폰 수 : 0</h5>
                </Col>
            </Row>
            {items.map((item) => (
                <Row
                    key={item.id}
                    className="coupon m-4 p-3 border border-4"
                    onClick={() =>
                        handleShow({ count: item.count, price: item.price })
                    }
                >
                    <Col>
                        <img
                            src={item.image.src}
                            width={item.image.width}
                            height={item.image.height}
                            alt="coupon"
                        />
                    </Col>
                    <Col className="count">
                        <span>X {item.count}</span>
                    </Col>
                    <Col className="price">
                        <span>{item.price} 원</span>
                    </Col>
                </Row>
            ))}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    정말 쿠폰 {modalContent.count} 개를 {modalContent.price}
                    원에 구매 하시겠습니까?
                </Modal.Body>
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

export default CouponComponent;
