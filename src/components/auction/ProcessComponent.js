import React from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import coupon from "../../images/shiba_coupon.png";
import FormTextBox from "../common/FormTextBox";

const ProcessComponent = ({ pno }) => {
    return (
        <>
            <Row
                className="fw-bold fs-3 position-absolute"
                style={{ marginTop: "-30px" }}
            >
                현재 참가자 수 : 8
            </Row>
            <Row
                className="justify-content-md-end"
                style={{
                    fontWeight: "bold",
                    alignItems: "center",
                    margin: "0",
                    marginTop: "-70px",
                }}
            >
                <Col
                    md="auto"
                    style={{ fontSize: "15px", textAlign: "center" }}
                >
                    남은 시간
                    <br />
                    (Remain Time)
                </Col>
                <Col md="auto" style={{ fontSize: "70px" }}>
                    05:22
                </Col>
            </Row>
            <Row className="justify-content-md-center fw-bold border border-secondary border-5 rounded-5">
                <Col
                    md="auto"
                    style={{ alignItems: "center", display: "flex" }}
                >
                    <Image width={250} height={300} src={coupon}></Image>
                </Col>
                <Col
                    md={8}
                    className="p-3 text-center"
                    style={{ marginTop: 15 }}
                >
                    <FormTextBox
                        name="물품 유형"
                        readOnly={true}
                        value="사무용품"
                    />
                    <FormTextBox
                        name="물품 명"
                        readOnly={true}
                        value={"시바 쿠폰"}
                    />
                    <FormTextBox
                        name="시작 금액"
                        readOnly={true}
                        value={10000}
                    />
                    <FormTextBox
                        name="현재 금액"
                        readOnly={true}
                        value={200000}
                    />
                    <FormTextBox
                        name="판매자"
                        readOnly={true}
                        value={"홍길동"}
                    />
                    <FormTextBox
                        name="설명"
                        readOnly={true}
                        value={"시바견이 소중히 아끼는 쿠폰이다."}
                    />
                </Col>
            </Row>
            <Row
                className="justify-content-md-end"
                style={{
                    fontWeight: "bold",
                    alignItems: "center",
                    height: 100,
                    margin: 10,
                }}
            >
                <Col md={6}>
                    <Form.Control type="text" />
                </Col>
                <Col md="auto">
                    <Button type="primary">낙찰하기</Button>
                </Col>
            </Row>
        </>
    );
};

export default ProcessComponent;
