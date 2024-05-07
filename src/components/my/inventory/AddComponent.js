import {
    QueryClient,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { itemAdd } from "../../../api/itemApi";
import ResultModal from "../../common/ResultModal";
import FetchingModal from "../../common/FetchingModal";

const textFormName = {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
};

const initState = {
    name: "",
    description: "",
    type: "",
    images: [],
    documents: [],
};

const textFormStyle = { fontSize: "15px", fontWeight: "bold" };

const AddComponent = () => {
    const [item, setItem] = useState(initState);
    const uploadImageRef = useRef();
    const uploadDocumentRef = useRef();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const closeButton = () => {
        setShow(false);
    };

    const handleShow = (content) => {
        setShow(true);
    };

    const addMutation = useMutation({
        mutationFn: (item) => itemAdd(item),
    });

    const handleChangeItem = (e) => {
        item[e.target.name] = e.target.value;
        setItem({ ...item });
    };

    const handleClickAdd = (e) => {
        const images = uploadImageRef.current.files;
        const documents = uploadDocumentRef.current.files;
        const formData = new FormData();

        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        for (let i = 0; i < documents.length; i++) {
            formData.append("documents", documents[i]);
        }

        // other data
        formData.append("name", item.name);
        formData.append("description", item.description);
        formData.append("type", item.type);

        console.log(formData.get("name"));

        addMutation.mutate(formData);
        setShow(false);
    };

    const queryClient = useQueryClient();

    const closeModal = () => {
        if (addMutation.isSuccess) {
            queryClient.invalidateQueries(["inventory"]);
            navigate({ pathname: "/my/inventory" }, { replace: true });
        }
    };

    return (
        <>
            <FetchingModal flag={addMutation.isPending} />
            <ResultModal
                flag={addMutation.isSuccess}
                title={"처리 결과"}
                content={"정상적으로 처리되었습니다."}
                callbackFn={closeModal}
            />
            <Row className="border border-5 rounded-5 p-4 border-secondary">
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        물품 명
                    </Col>
                    <Col md={7}>
                        <Form.Control
                            type="text"
                            style={textFormStyle}
                            name="name"
                            value={item.name}
                            onChange={handleChangeItem}
                        />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        물품 유형
                    </Col>
                    <Col md={7}>
                        <Form.Select
                            name="type"
                            value={item.type}
                            onChange={handleChangeItem}
                        >
                            <option>Open this select menu</option>
                            <option value="ELECTRIC">전자제품</option>
                            <option value="BOOK">도서</option>
                            <option value="CLOTHES">의류</option>
                            <option value="MEDICINE">의약품</option>
                            <option value="FOOD">음식</option>
                            <option value="TOY">장난감</option>
                            <option value="ETC">기타</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        설명
                    </Col>
                    <Col md={7}>
                        <Form.Control
                            type="text"
                            style={textFormStyle}
                            name="description"
                            value={item.description}
                            onChange={handleChangeItem}
                        />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        물품 이미지
                    </Col>
                    <Col md={7}>
                        <Form.Control
                            type="file"
                            ref={uploadImageRef}
                            multiple={true}
                        />
                    </Col>
                </Row>
                <Row className="m-2 p-2 justify-content-md-center">
                    <Col md={2} style={textFormName}>
                        서류 등록
                    </Col>
                    <Col md={7}>
                        <Form.Control
                            type="file"
                            ref={uploadDocumentRef}
                            multiple={true}
                        />
                    </Col>
                </Row>
            </Row>
            <Row className="pt-4 text-end">
                <Col>
                    <Button
                        size="lg"
                        className="primary"
                        onClick={() => handleShow()}
                    >
                        등록신청하기
                    </Button>
                </Col>
            </Row>
            <Modal show={show} onHide={closeButton}>
                <Modal.Header closeButton>
                    <Modal.Title>확인</Modal.Title>
                </Modal.Header>
                <Modal.Body>물품 등록을 신청하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClickAdd}>
                        예
                    </Button>
                    <Button variant="secondary" onClick={closeButton}>
                        아니오
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddComponent;
