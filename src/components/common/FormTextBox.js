import React from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";

const FormTextBox = ({
    name,
    readOnly,
    value,
    defaultValue,
    isLast = false,
}) => {
    return (
        <Row style={{ marginBottom: `${isLast ? "0" : "15px"}` }}>
            <Col md={2} className="justify-content-md-end">
                <Form.Label className="p-2">{name}</Form.Label>
            </Col>
            <Col md={10}>
                <Form.Control
                    type="text"
                    readOnly={readOnly}
                    value={value}
                    defaultValue={defaultValue}
                />
            </Col>
        </Row>
    );
};

export default FormTextBox;
