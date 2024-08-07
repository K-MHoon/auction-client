import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { itemGet } from "../../api/itemApi";
import { API_SERVER_HOST } from "../../api/info";
import { auctionAdd } from "../../api/auctionApi";
import ResultModal from "../common/ResultModal";
import { useNavigate } from "react-router-dom";
import FetchingModal from "../common/FetchingModal";

const textFormName = {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
};

const textFormStyle = {
    fontSize: "15px",
    fontWeight: "bold",
};

const initState = {
    title: "",
    minPrice: 0,
    type: "OPEN",
    startTime: "",
    endTime: "",
    description: "",
    itemSeq: 0,
};

const itemState = {
    sequence: 0,
    name: "",
    description: "",
    type: "",
    isUse: false,
    createdBy: "",
    createdAt: "",
    itemImageList: [],
    itemDocumentList: [],
};

const AddComponent = ({ ino }) => {
    const [auction, setAuction] = useState(initState);
    const [show, setShow] = useState(false);
    const imageRef = useRef();
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: ["item", ino],
        queryFn: () => itemGet(ino),
        staleTime: 1000 * 10 * 60,
        retry: 1,
    });

    const addMutation = useMutation({
        mutationFn: (auction) => auctionAdd(auction),
    });

    const handleClickAdd = (e) => {
        const images = imageRef.current.files;
        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        formData.append("title", auction.title);
        formData.append("minPrice", auction.minPrice);
        formData.append("type", auction.type);
        formData.append("startTime", auction.startTime);
        formData.append("endTime", auction.endTime);
        formData.append("description", auction.description);
        formData.append("itemSeq", ino);

        addMutation.mutate(formData);
        setShow(false);
    };

    const handleClose = () => setShow(false);

    const handleShow = (content) => {
        setShow(true);
    };

    const handleChangeAuction = (e) => {
        auction[e.target.name] = e.target.value;
        setAuction({ ...auction });
    };

    const data = query.data || itemState;

    const closeModal = () => {
        if (addMutation.isSuccess) {
            navigate({ pathname: "/my/auction/list" }, { replace: true });
        }
    };

    console.log(auction);

    return (
        <>
            <FetchingModal flag={addMutation.isPending} />
            <ResultModal
                flag={addMutation.isSuccess}
                title={"처리 결과"}
                content={"정상적으로 처리되었습니다."}
                callbackFn={closeModal}
            />
            <Row className="p-2 justify-content-md-center" style={textFormName}>
                해당 물품을 경매에 등록합니다.
            </Row>

            <Row className="m-2 p-2 justify-content-md-center">
                <Col
                    md={10}
                    style={{
                        border: "5px solid red",
                        borderRadius: "15px",
                        padding: "30px",
                    }}
                >
                    <Row
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Col md={4}>
                            {data.itemImageList[0] && (
                                <Image
                                    src={`${API_SERVER_HOST}/api/view/item/${data.itemImageList[0].fileName}`}
                                    width="200px"
                                    height="200px"
                                    style={{ margin: 10 }}
                                />
                            )}
                        </Col>
                        <Col className="m-2 p-2 justify-content-md-center">
                            <Row className="p-2">
                                <Col md={2} style={textFormName}>
                                    이름
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={data.name}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col md={2} style={textFormName}>
                                    종류
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={data.type}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                            <Row className="p-2">
                                <Col md={2} style={textFormName}>
                                    설명
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        size="sm"
                                        value={data.description}
                                        readOnly={true}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row
                className="p-2 justify-content-md-center"
                style={{ margin: 8, marginTop: 15 }}
            >
                <Col md={2} style={textFormName}>
                    경매 제목
                </Col>
                <Col md={7}>
                    <Form.Control
                        type="text"
                        value={auction.title}
                        name="title"
                        style={textFormStyle}
                        onChange={handleChangeAuction}
                    />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    경매 유형
                </Col>
                <Col md={7}>
                    <Form.Select
                        name="type"
                        value={auction.type}
                        onChange={handleChangeAuction}
                    >
                        <option>Open this select menu</option>
                        <option value="OPEN">공개 입찰</option>
                        <option value="SECRET">비밀 입찰</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    시작 금액
                </Col>
                <Col md={7}>
                    <Form.Control
                        type="text"
                        name="minPrice"
                        style={textFormStyle}
                        onChange={handleChangeAuction}
                    />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    시작 시간
                </Col>
                <Col md={7}>
                    <Form.Control
                        type="datetime-local"
                        name="startTime"
                        style={textFormStyle}
                        onChange={handleChangeAuction}
                    />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    종료 시간
                </Col>
                <Col md={7}>
                    <Form.Control
                        type="datetime-local"
                        name="endTime"
                        style={textFormStyle}
                        onChange={handleChangeAuction}
                    />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    이미지 등록
                </Col>
                <Col md={7}>
                    <Form.Control type="file" ref={imageRef} multiple={false} />
                </Col>
            </Row>
            <Row className="m-2 p-2 justify-content-md-center">
                <Col md={2} style={textFormName}>
                    설명
                </Col>
                <Col md={7}>
                    <Form.Control
                        as="textarea"
                        name="description"
                        rows={5}
                        onChange={handleChangeAuction}
                    />
                </Col>
            </Row>
            <Row className="m-2 p-4 text-end">
                <Col>
                    <Button className="primary" onClick={() => handleShow()}>
                        시작하기
                    </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    경매를 시작하시겠습니까? (경매쿠폰이 차감됩니다.)
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClickAdd}>
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
