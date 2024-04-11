import React from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import coupon from "../../images/shiba_coupon.png";
import FormTextBox from "../common/FormTextBox";

const ReadComponent = ({ ino }) => {
    return (
        <>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <Image width={250} height={300} src={coupon}></Image>
                </Col>
                <Col md={8} className="p-3 text-center">
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
                        name="낙찰 금액"
                        readOnly={true}
                        value={200000}
                    />
                    <FormTextBox
                        name="낙찰 시간"
                        readOnly={true}
                        value={"2022-01-01 12:30:12"}
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        padding: "20px",
                    }}
                >
                    <Button variant="primary">목록으로</Button>
                </div>
            </Row>
        </>
    );
};

export default ReadComponent;
