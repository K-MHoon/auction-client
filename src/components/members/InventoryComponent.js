import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

const items = [
    {
        id: 1,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩1,000,000",
    },
    {
        id: 2,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 3,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 4,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 5,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 6,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 1,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩1,000,000",
    },
    {
        id: 2,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 3,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 4,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 5,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    {
        id: 6,
        imageUrl: "https://via.placeholder.com/150",
        price: "₩2,000,000",
    },
    // 더 많은 아이템을 추가할 수 있습니다.
];

const InventoryComponent = () => {
    return (
        <>
            <Row>
                {items.map((item, index) => (
                    <Col
                        key={item.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2}
                        className="p-2"
                    >
                        <Card>
                            <Card.Img variant="top" src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title>아이템 {index + 1}</Card.Title>
                                <Card.Text>{item.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="p-5 text-center">
                <Col md="auto" style={{ fontSize: "30px", fontWeight: "bold" }}>
                    내 보유 금액
                </Col>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="₩ 2,000,000"
                        readOnly
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default InventoryComponent;
