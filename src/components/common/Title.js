import React from "react";
import { Col, Row } from "react-bootstrap";

const Title = ({ title }) => {
    return (
        <Row className="justify-content-md-center p-5">
            <Col md="auto">
                <h2 style={{ fontWeight: "bold" }}>{title}</h2>
            </Col>
        </Row>
    );
};

export default Title;
