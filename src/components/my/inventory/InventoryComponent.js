import React from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    return (
        <>
            <Row className="border rounded-5 border-5 p-3 border-primary">
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
            <Row className="mt-5 justify-content-md-end">
                <Col md="auto" className="p-3">
                    <Button variant="outline-warning" size="lg">
                        물품 내리기
                    </Button>
                </Col>
                <Col md="auto" className="p-3">
                    <Button
                        variant="outline-primary"
                        size="lg"
                        onClick={() => navigate({ pathname: "add" })}
                    >
                        신규 물품 등록하기
                    </Button>
                </Col>
            </Row>
            <Row className="m-5 p-5 text-center border rounded-4 border-5 border-primary">
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
