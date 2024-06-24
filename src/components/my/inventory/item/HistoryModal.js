import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Table } from "react-bootstrap";
import { itemHistoryDetailGet, itemHistoryGet } from "../../../../api/itemApi";
import FormTextBox from "../../../common/FormTextBox";

const initState = {
    current: 0,
    dtoList: [],
    next: false,
    nextPage: 0,
    pageNumList: [],
    prev: false,
    prevPage: 0,
    totalCount: 0,
    totalPage: 0,
};

const detailState = {
    sequence: 0,
    title: "",
    minPrice: "",
    price: "",
    description: "",
    status: "",
    soldTime: "",
    seller: "",
    buyer: "",
};

const HistoryModal = ({ flag, flagFn, seq }) => {
    const [pageInfo, setPageInfo] = useState(initState);
    const [detailFlag, setDetailFlag] = useState(false);
    const [auctionDetail, setAuctionDetail] = useState(detailState);
    const [itemToShow, setItemToShow] = useState([]);

    useEffect(() => {
        if (!flag) return;
        itemHistoryGet(seq, pageInfo.current, 10).then((data) => {
            setPageInfo(data);
            setItemToShow(
                data.pageNumList.map((num) => (
                    <Pagination.Item
                        key={num}
                        active={pageInfo.current === num - 1}
                        onClick={() =>
                            setPageInfo((prev) => ({
                                ...prev,
                                current: num - 1,
                            }))
                        }
                    >
                        {num}
                    </Pagination.Item>
                ))
            );
        });
    }, [flag, pageInfo.current]);

    const handleShowDetail = (auctionSeq) => {
        setDetailFlag(true);
        itemHistoryDetailGet(seq, auctionSeq).then((data) => {
            setAuctionDetail(data);
        });
    };

    return (
        <Modal show={flag} onHide={flagFn(false)} size="lg">
            <Modal.Header
                style={{ backgroundColor: "rgb(150,150,200)" }}
                closeButton
            >
                <Modal.Title
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "35px",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    {detailFlag ? "경매 세부 정보" : "경매 이력"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detailFlag ? (
                    <>
                        <FormTextBox
                            name="제목"
                            readOnly={true}
                            value={auctionDetail.title}
                        />
                        <FormTextBox
                            name="초기 금액"
                            readOnly={true}
                            value={auctionDetail.minPrice}
                        />
                        <FormTextBox
                            name="판매 금액"
                            readOnly={true}
                            value={auctionDetail.price}
                        />
                        <FormTextBox
                            name="물품 설명"
                            readOnly={true}
                            value={auctionDetail.description}
                        />
                        <FormTextBox
                            name="경매 상태"
                            readOnly={true}
                            value={auctionDetail.status}
                        />
                        <FormTextBox
                            name="판매 시간"
                            readOnly={true}
                            value={auctionDetail.soldTime}
                        />
                        <FormTextBox
                            name="판매자"
                            readOnly={true}
                            value={auctionDetail.seller.email}
                        />
                        <FormTextBox
                            name="구매자"
                            readOnly={true}
                            value={auctionDetail.buyer.email}
                        />
                        <Button onClick={() => setDetailFlag(false)}>
                            이전으로
                        </Button>
                    </>
                ) : (
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>제목</th>
                                    <th>최소 가격</th>
                                    <th>팔린 가격</th>
                                    <th>팔린 시간</th>
                                    <th>구매자</th>
                                    <th>판매자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageInfo.dtoList.map((d, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() =>
                                            handleShowDetail(d.sequence)
                                        }
                                    >
                                        <td>
                                            {pageInfo.current * 10 + idx + 1}
                                        </td>
                                        <td>{d.title}</td>
                                        <td>{d.minPrice}</td>
                                        <td>{d.price}</td>
                                        <td>{d.soldTime}</td>
                                        <td>{d.buyer.name}</td>
                                        <td>{d.seller.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div
                            style={{
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Pagination>
                                <Pagination.First
                                    onClick={() =>
                                        setPageInfo((prev) => ({
                                            ...prev,
                                            current: 0,
                                        }))
                                    }
                                />
                                <Pagination.Prev
                                    onClick={() =>
                                        setPageInfo((prev) => ({
                                            ...prev,
                                            current: Math.max(
                                                1,
                                                prev.totalPage - 1
                                            ),
                                        }))
                                    }
                                />
                                {itemToShow}
                                <Pagination.Next
                                    onClick={() =>
                                        setPageInfo((prev) => ({
                                            ...prev,
                                            current: Math.min(
                                                pageInfo.totalPage,
                                                prev + 1
                                            ),
                                        }))
                                    }
                                />
                                <Pagination.Last
                                    onClick={() =>
                                        setPageInfo((prev) => ({
                                            ...prev,
                                            current: prev.totalPage - 1,
                                        }))
                                    }
                                />
                            </Pagination>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default HistoryModal;
