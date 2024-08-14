import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Image, Modal, Table } from "react-bootstrap";
import FormTextBox from "../common/FormTextBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    auctionCurrentPriceGet,
    auctionFinishPost,
    auctionGet,
    auctionUpdatePrice,
} from "../../api/auctionApi";
import { API_SERVER_HOST } from "../../api/info";
import FetchingModal from "../common/FetchingModal";
import { KRW } from "./../common/CommonFunc";
import useCustomSocket from "./../../hooks/useCustomSocket";
import AnimatedNumber from "../common/AnimatedNumber";
import { auctionTypeList } from "../common/TypeName";
import { getCookie } from "../../util/cookieUtil";
import { useNavigate } from "react-router-dom";

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
    priceUnit: 0,
};

const Circle = ({ color, value }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            padding: "5px",
        }}
    >
        <div
            style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: `${color}`,
                marginRight: "10px",
            }}
        />
        {value}
    </div>
);

const auctionSocketValue = {
    participant: 0,
    currentPrice: 0,
    status: "RUNNING",
    history: [
        {
            price: 0,
            date: "",
        },
    ],
};

const ProcessComponent = ({ pno }) => {
    const { connect, disconnect } = useCustomSocket();
    const [price, setPrice] = useState(0);
    const [socketValue, setSocketValue] = useState(auctionSocketValue);
    const [timeDifference, setTimeDifference] = useState("");
    const [targetTime, setTargetTime] = useState(null);
    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        auctionCurrentPriceGet(pno).then((data) => {
            socketValue["currentPrice"] = data;
            setSocketValue({ ...socketValue });
        });
    }, []);

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
            socketValue["participant"] = jsonBody.count;
            setSocketValue({ ...socketValue });
        },
    };

    const updatePriceFunc = {
        key: `/sub/auction/${pno}/price`,
        func: (callback) => {
            const jsonBody = JSON.parse(callback.body);
            console.log(jsonBody);
            socketValue["currentPrice"] = jsonBody.price;
            setSocketValue({ ...socketValue });
        },
    };

    const updateStatusFunc = {
        key: `/sub/auction/${pno}/status`,
        func: (callback) => {
            const jsonBody = JSON.parse(callback.body);
            console.log(jsonBody);
            socketValue["status"] = jsonBody.auctionStatus;
            setSocketValue({ ...socketValue });
        },
    };

    const updatePriceHistoryFunc = {
        key: `/sub/auction/${pno}/price/user/${
            getCookie("member").email
        }/history`,
        func: (callback) => {
            const jsonBody = JSON.parse(callback.body);
            console.log(jsonBody);
            socketValue["history"] = jsonBody.priceHistoryList;
            setSocketValue({ ...socketValue });
        },
    };

    const handleClose = () => {
        auctionFinishPost(pno, modalContent);
        navigate({ pathname: "/" }, { replace: true });
        setShow(false);
    };

    useEffect(() => {
        connect([
            participantFunc,
            updatePriceFunc,
            updateStatusFunc,
            updatePriceHistoryFunc,
        ]);
        return () => disconnect();
    }, []);

    const updatePriceMutation = useMutation({
        mutationFn: () => auctionUpdatePrice(pno, price),
    });

    const data = query.data || initState;
    const isSeller = getCookie("member").email === data.seller.email;

    useEffect(() => {
        if (!query.isSuccess) return;
        console.log(data.endTime);
        setTargetTime(new Date(data.endTime));
    }, [data.endTime]);

    useEffect(() => {
        if (targetTime) {
            const updateTimeDifference = () => {
                const currentTime = new Date();
                const diffInMilliseconds = targetTime - currentTime;
                const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
                const hours = Math.floor(diffInSeconds / 3600);
                const minutes = Math.floor((diffInSeconds % 3600) / 60);
                const seconds = diffInSeconds % 60;

                setTimeDifference(
                    `${String(hours).padStart(2, "0")}:${String(
                        minutes
                    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
                );
            };

            updateTimeDifference(); // 초기 계산

            const intervalId = setInterval(updateTimeDifference, 1000); // 1초마다 갱신

            return () => clearInterval(intervalId);
        }
    }, [targetTime]);

    useEffect(() => {
        if (
            socketValue.status === "STOPPED" ||
            socketValue.status === "FINISHED"
        ) {
            alert("판매자에 의해 경매가 종료되었습니다.");
            navigate("/");
            return;
        }
    }, [socketValue.status]);

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalContent === "STOPPED" ? "중단" : "완료"}확인
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent === "STOPPED"
                        ? "경매를 중단하시겠습니까? 중단하는 경우, 현재 경매중인 물품은 회수되며, 경매가 종료됩니다."
                        : "경매를 완료하시겠습니까? 완료하는 경우, 현재 경매중인 물품은 현시점에 최대 가격을 부른 사용자에게 넘어가며, 경매가 종료됩니다."}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        예
                    </Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
            <FetchingModal flag={query.isFetching} />
            <Row
                className="fw-bold fs-3 position-absolute"
                style={{ marginTop: "-30px" }}
            >
                현재 참가자 수 : {socketValue["participant"]} /{" "}
                {data.maxParticipantCount}
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
                <Col md="auto" style={{ fontSize: "60px" }}>
                    {timeDifference}
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
                        value={auctionTypeList[data.auctionType]}
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
            <div
                style={{
                    width: "100%",
                    marginTop: "30px",
                }}
            >
                <Circle value="시작 금액" color="green" />
                <Circle value="다음 금액" color="orange" />
                <Circle value="현재 금액" color="red" />
            </div>
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
                        cursor: "pointer",
                    }}
                    onClick={(e) => {
                        if (!isSeller) {
                            setPrice(
                                socketValue["currentPrice"] + data.priceUnit
                            );
                            updatePriceMutation.mutate();
                        }
                    }}
                >
                    <span>
                        <AnimatedNumber
                            targetValue={
                                socketValue["currentPrice"] + data.priceUnit
                            }
                            duration={1000}
                        />
                    </span>
                </Col>
                <Col
                    style={{
                        padding: "30px",
                        backgroundColor: "red",
                        borderRadius: "50px",
                        textAlign: "center",
                    }}
                >
                    <span>
                        <AnimatedNumber
                            targetValue={socketValue["currentPrice"]}
                            duration={1000}
                        />
                    </span>
                </Col>
            </Row>
            {isSeller ? (
                <Row
                    className="justify-content-md-end"
                    style={{
                        fontWeight: "bold",
                        alignItems: "center",
                        height: 100,
                        margin: 10,
                    }}
                >
                    <Col md="auto">
                        <Button
                            style={{
                                width: "200px",
                                height: "50px",
                            }}
                            variant="outline-danger"
                            onClick={() => {
                                setModalContent("STOPPED");
                                setShow(true);
                            }}
                        >
                            중단하기
                        </Button>
                    </Col>
                    <Col md="auto">
                        <Button
                            style={{
                                width: "200px",
                                height: "50px",
                            }}
                            variant="outline-warning"
                            onClick={() => {
                                setModalContent("FINISHED");
                                setShow(true);
                            }}
                        >
                            현재 금액으로 끝내기
                        </Button>
                    </Col>
                </Row>
            ) : (
                <>
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
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                        <Col md="auto">
                            <Button
                                type="primary"
                                onClick={() => updatePriceMutation.mutate()}
                            >
                                금액 제출
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label
                            style={{
                                textAlign: "center",
                                marginBottom: 20,
                                marginTop: 20,
                                fontSize: "30px",
                                fontWeight: "bold",
                            }}
                        >
                            제출 이력(History)
                        </Form.Label>
                    </Row>
                    <Row>
                        <Table style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>시간</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                {socketValue["history"].map((d, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{d.date}</td>
                                        <td>{d.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProcessComponent;
