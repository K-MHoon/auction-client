import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Dropdown,
    DropdownButton,
    FormControl,
    InputGroup,
    Pagination,
    Row,
    Table,
} from "react-bootstrap";
import { auctionListGet } from "../../api/auctionApi";
import { KRW } from "../common/CommonFunc";

const itemTypeList = {
    ALL: "전체",
    ELECTRIC: "전자제품",
    BOOK: "도서",
    CLOTHES: "의류",
    MEDICINE: "의약품",
    FOOD: "음식",
    TOY: "장난감",
    ETC: "기타",
};

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

const ListComponent = () => {
    const [itemType, setItemType] = useState(null);
    const [itemName, setItemName] = useState(null);
    const [pageInfo, setPageInfo] = useState(initState);
    const [itemToShow, setItemToShow] = useState([]);

    useEffect(() => {
        auctionListGet(itemType, itemName, pageInfo.current, 10).then(
            (data) => {
                setPageInfo(data);
                setItemToShow(
                    data.pageNumList.map((num) => (
                        <Pagination.Item
                            key={num}
                            active={pageInfo.current === num - 1}
                            onClick={() => {
                                setPageInfo((prev) => ({
                                    ...prev,
                                    current: num - 1,
                                }));
                            }}
                        >
                            {num}
                        </Pagination.Item>
                    ))
                );
            }
        );
    }, [pageInfo.current]);

    const handleSearchItem = () => {
        auctionListGet(itemType, itemName, 0, 10).then((data) => {
            setPageInfo(data);
            setItemToShow(
                data.pageNumList.map((num) => (
                    <Pagination.Item
                        key={num}
                        active={pageInfo.current === num - 1}
                        onClick={() => {
                            setPageInfo((prev) => ({
                                ...prev,
                                current: num - 1,
                            }));
                        }}
                    >
                        {num}
                    </Pagination.Item>
                ))
            );
        });
    };

    const handleItemTypeSelect = (eventKey) => {
        if (eventKey === "ALL") {
            setItemType(null);
        } else {
            setItemType(eventKey);
        }
    };

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    return (
        <>
            <Row className="d-flex justify-content-md-center p-5">
                <Col xs="auto" lg="8">
                    <InputGroup>
                        <DropdownButton
                            id="dropdown-auction-type"
                            title={itemType ? itemTypeList[itemType] : "전체"}
                            onSelect={handleItemTypeSelect}
                        >
                            {Object.entries(itemTypeList).map(
                                ([key, value]) => (
                                    <Dropdown.Item key={key} eventKey={key}>
                                        {value}
                                    </Dropdown.Item>
                                )
                            )}
                        </DropdownButton>
                        <FormControl
                            placeholder={`${
                                itemType ? itemTypeList[itemType] : "물품"
                            } 검색...`}
                            value={itemName}
                            onChange={handleItemNameChange}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => handleSearchItem()}
                        >
                            검색
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Table style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>제목</th>
                        <th>물품명</th>
                        <th>물품 유형</th>
                        <th>최소 가격</th>
                        <th>현재 가격</th>
                        <th>종료 시간</th>
                        <th>판매자</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.dtoList.map((d, idx) => (
                        <tr key={idx}>
                            <td>{pageInfo.current * 10 + idx + 1}</td>
                            <td>{d.title}</td>
                            <td>{d.item.name}</td>
                            <td>{itemTypeList[d.item.type]}</td>
                            <td>{KRW(d.minPrice)}</td>
                            <td>{KRW(d.price)}</td>
                            <td>{d.endTime}</td>
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
                                current: Math.max(1, prev.totalPage - 1),
                            }))
                        }
                    />
                    {itemToShow}
                    <Pagination.Next
                        onClick={() =>
                            setPageInfo((prev) => ({
                                ...prev,
                                current: Math.min(pageInfo.totalPage, prev + 1),
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
    );
};

export default ListComponent;
