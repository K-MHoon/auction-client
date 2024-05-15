import React, { useEffect } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCustomInventory from "./../../../hooks/useCustomInventory";
import { API_SERVER_HOST } from "../../../api/info";
import FetchingModal from "../../common/FetchingModal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { itemDelete } from "../../../api/itemApi";
import ResultModal from "../../common/ResultModal";

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

const host = API_SERVER_HOST;

const initialPopup = {
    title: "",
    content: "",
    callbackFn: () => {},
};
const InventoryComponent = () => {
    const [selectedItemArray, setSelectedItemArray] = useState([]);
    const [popup, setPopup] = useState(initialPopup);
    const [show, setShow] = useState(false);
    const { inventory, query } = useCustomInventory();

    const handleSelected = (e) => {
        if (e.target.checked) {
            setSelectedItemArray([
                ...selectedItemArray,
                Number.parseInt(e.target.id),
            ]);
        } else {
            setSelectedItemArray(
                selectedItemArray.filter(
                    (i) => i !== Number.parseInt(e.target.id)
                )
            );
        }
    };

    const deleteMutation = useMutation({
        mutationFn: (item) => itemDelete(item),
    });

    const deleteSelectedItemArray = () => {
        deleteMutation.mutate(selectedItemArray);
    };

    const queryClient = useQueryClient();

    useEffect(() => {
        if (deleteMutation.isSuccess) {
            queryClient.invalidateQueries(["inventory"]);
            setPopup({
                title: "처리 성공",
                content: "정상적으로 처리되었습니다.",
                callbackFn: () => setShow(false),
            });
            setShow(true);
        }
        if (deleteMutation.isError) {
            setPopup({
                title: "처리 실패",
                content: "처리에 실패했습니다.",
                callbackFn: () => setShow(false),
            });
            setShow(true);
        }
    }, [deleteMutation.isSuccess, deleteMutation.isError]);

    console.log(selectedItemArray);

    const navigate = useNavigate();

    return (
        <>
            <FetchingModal
                flag={query.isFetching || deleteMutation.isPending}
            />
            <ResultModal
                flag={show}
                title={popup.title}
                content={popup.content}
                callbackFn={popup.callbackFn}
            />
            <Row className="border rounded-5 border-5 p-3 border-primary">
                {inventory.itemList.map((item, index) => (
                    <div
                        style={{
                            width: 230,
                            backgroundColor: "#facc6b",
                            backgroundImage:
                                "linear-gradient(315deg, #facc6b 0%, #fabc3c 74%)",
                            margin: 10,
                            padding: 10,
                            borderRadius: 20,
                        }}
                        key={item.sequence}
                    >
                        <Form.Check
                            style={{ marginLeft: 8 }}
                            id={item.sequence}
                            onClick={handleSelected}
                        />
                        <Col
                            className="p-2"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate({ pathname: `item/${item.sequence}` })
                            }
                        >
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={`${host}/api/view/item/s_${
                                        item.itemImageList &&
                                        item.itemImageList[0]
                                            ? item.itemImageList[0].fileName
                                            : "default"
                                    }`}
                                    width="150px"
                                    height="150px"
                                />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        <span>{item.type}</span>
                                        <br />₩ {item.price ? item.price : 0}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                ))}
            </Row>
            <Row className="mt-5 justify-content-md-end">
                <Col md="auto" className="p-3">
                    <Button
                        variant="outline-warning"
                        size="lg"
                        onClick={deleteSelectedItemArray}
                    >
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
                        value={Intl.NumberFormat("ko-KR", {
                            style: "currency",
                            currency: "KRW",
                        }).format(inventory.money)}
                        readOnly
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default InventoryComponent;
