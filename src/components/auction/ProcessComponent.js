import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import FormTextBox from "../common/FormTextBox";
import { useQuery } from "@tanstack/react-query";
import { auctionGet } from "../../api/auctionApi";
import { API_SERVER_HOST } from "../../api/info";
import FetchingModal from "../common/FetchingModal";
import { KRW } from "./../common/CommonFunc";
import useCustomSocket from "./../../hooks/useCustomSocket";

const itemState = {
    sequence: 0,
    name: "",
    description: "",
    type: "",
    itemImageList: [{ fileName: "default.png", ord: 0 }],
};

const initState = {
    sequence: 0,
    title: "",
    minPrice: 0,
    price: 0,
    description: "",
    status: "",
    soldTime: "",
    item: itemState,
    endTime: "",
    auctionType: "",
    auctionImageList: [{ fileName: "default.png" }],
    seller: "",
    buyer: "",
    startTime: "",
    maxParticipantCount: 0,
};

const ProcessComponent = ({ pno }) => {
    const { connect, disconnect } = useCustomSocket();
    const [participant, setParticipant] = useState(0);

    const query = useQuery({
        queryKey: ["auction", pno],
        queryFn: () => auctionGet(pno),
        staleTime: 1000 * 10 * 60,
        retry: 1,
    });

    const participantFunc = {
        key: `/sub/auction/${pno}/participant`,
        func: (callback) => {
            const jsonBody = JSON.parse(callback.body);
            console.log(jsonBody);
            setParticipant(jsonBody.count);
        },
    };

    useEffect(() => {
        connect([participantFunc]);
        return () => disconnect();
    }, []);

    const data = query.data || initState;

    return (
        <>
            <FetchingModal flag={query.isFetching} />
            <Row
                className="fw-bold fs-3 position-absolute"
                style={{ marginTop: "-30px" }}
            >
                현재 참가자 수 : {participant} / {data.maxParticipantCount}
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

            <Row md={8} className="p-3 text-center justify-content-md-center">
                <Form.Label
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                        fontSize: "30px",
                        fontWeight: "bold",
                    }}
                >
                    경매 정보(Auction)
                </Form.Label>
            </Row>
            <Row
                style={{
                    border: "5px solid black",
                    borderRadius: "20px",
                    padding: "30px",
                }}
            >
                <Col
                    md="auto"
                    style={{ alignItems: "center", display: "flex" }}
                >
                    <Image
                        width={250}
                        height={250}
                        src={`${API_SERVER_HOST}/api/view/item/${data.auctionImageList[0].fileName}`}
                    ></Image>
                </Col>

                <Col
                    md={8}
                    className="p-3 text-center"
                    style={{ marginTop: 15 }}
                >
                    <FormTextBox
                        name="경매 유형"
                        readOnly={true}
                        value={data.auctionType}
                    />
                    <FormTextBox
                        name="경매 제목"
                        readOnly={true}
                        value={data.title}
                    />
                    <FormTextBox
                        name="시작 시간"
                        readOnly={true}
                        value={data.startTime}
                    />
                    <FormTextBox
                        name="종료 시간"
                        readOnly={true}
                        value={data.endTime}
                    />
                    <FormTextBox
                        name="판매자"
                        readOnly={true}
                        value={data.seller.name}
                    />
                    <FormTextBox
                        name="설명"
                        readOnly={true}
                        value={data.description}
                    />
                </Col>
            </Row>
            <Row md={8} className="p-3 text-center justify-content-md-center">
                <Form.Label
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                        marginTop: 20,
                        fontSize: "30px",
                        fontWeight: "bold",
                    }}
                >
                    물품 정보(Item)
                </Form.Label>
            </Row>
            <Row
                style={{
                    border: "5px solid black",
                    borderRadius: "20px",
                    padding: "30px",
                }}
            >
                <Col
                    md="auto"
                    style={{ alignItems: "center", display: "flex" }}
                >
                    <Image
                        width={250}
                        height={250}
                        src={`${API_SERVER_HOST}/api/view/item/${data.item.itemImageList[0].fileName}`}
                    ></Image>
                </Col>

                <Col
                    md={8}
                    className="p-3 text-center"
                    style={{ marginTop: 15 }}
                >
                    <FormTextBox
                        name="물품 유형"
                        readOnly={true}
                        value={data.item.type}
                    />
                    <FormTextBox
                        name="물품 명"
                        readOnly={true}
                        value={data.item.name}
                    />
                    <FormTextBox
                        name="물품 설명"
                        readOnly={true}
                        value={data.item.description}
                    />
                </Col>
            </Row>
            <Row
                style={{
                    marginTop: "40px",
                    fontSize: "40px",
                    color: "white",
                }}
            >
                <Col
                    style={{
                        padding: "30px",
                        marginRight: "50px",
                        backgroundColor: "green",
                        borderRadius: "50px",
                        textAlign: "center",
                    }}
                >
                    <span>{KRW(data.minPrice)}</span>
                </Col>
                <Col
                    style={{
                        padding: "30px",
                        marginRight: "50px",
                        backgroundColor: "orange",
                        borderRadius: "50px",
                        textAlign: "center",
                    }}
                >
                    <span>{KRW(data.price)}</span>
                </Col>
                <Col
                    style={{
                        padding: "30px",
                        backgroundColor: "red",
                        borderRadius: "50px",
                        textAlign: "center",
                    }}
                >
                    <span>{KRW(data.minPrice)}</span>
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
