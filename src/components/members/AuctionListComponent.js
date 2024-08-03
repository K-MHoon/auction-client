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
import { myAuctionListGet } from "../../api/auctionApi";
import { KRW } from "../common/CommonFunc";
import {
    auctionStatusTypeList,
    auctionTypeList,
    itemTypeList,
} from "../common/TypeName";

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

const requestParam = {
    auctionStatus: null,
    auctionType: null,
    itemType: null,
    itemName: null,
};

const auctionStatusColorList = {
    BEFORE: "blue",
    RUNNING: "green",
    STOPPED: "red",
    FINISHED: "purple",
};

const AuctionListComponent = () => {
    const [param, setParam] = useState(requestParam);
    const [pageInfo, setPageInfo] = useState(initState);
    const [itemToShow, setItemToShow] = useState([]);
    console.log(pageInfo);

    useEffect(() => {
        myAuctionListGet(param, pageInfo.current, 10).then((data) => {
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
    }, [pageInfo.current]);

    const handleSearchItem = () => {
        myAuctionListGet(param, 0, 10).then((data) => {
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

    const handleParam = (e) => {
        param[e.target.name] = e.target.value;
        setParam({ ...param });
    };

    const handleItemType = (eventKey) => {
        param["itemType"] = eventKey === "ALL" ? null : eventKey;
        setParam({ ...param });
    };

    const handleAuctionType = (eventKey) => {
        param["auctionType"] = eventKey === "ALL" ? null : eventKey;
        setParam({ ...param });
    };

    const handleAuctionStatus = (eventKey) => {
        param["auctionStatus"] = eventKey === "ALL" ? null : eventKey;
        setParam({ ...param });
    };

    return (
        <>
            <Row className="d-flex justify-content-md-center p-5">
                <Col xs="auto">
                    <InputGroup>
                        <InputGroup.Text>경매 유형</InputGroup.Text>
                        <DropdownButton
                            title={
                                param.auctionType
                                    ? auctionTypeList[param.auctionType]
                                    : "전체"
                            }
                            onSelect={handleAuctionType}
                            variant="success"
                        >
                            {Object.entries(auctionTypeList).map(
                                ([key, value]) => (
                                    <Dropdown.Item key={key} eventKey={key}>
                                        {value}
                                    </Dropdown.Item>
                                )
                            )}
                        </DropdownButton>
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <InputGroup>
                        <InputGroup.Text>경매 상태</InputGroup.Text>
                        <DropdownButton
                            title={
                                param.auctionStatus
                                    ? auctionStatusTypeList[param.auctionStatus]
                                    : "전체"
                            }
                            onSelect={handleAuctionStatus}
                            variant="warning"
                        >
                            {Object.entries(auctionStatusTypeList).map(
                                ([key, value]) => (
                                    <Dropdown.Item key={key} eventKey={key}>
                                        {value}
                                    </Dropdown.Item>
                                )
                            )}
                        </DropdownButton>
                    </InputGroup>
                </Col>
                <Col xs="auto" lg="7">
                    <InputGroup>
                        <DropdownButton
                            title={
                                param.itemType
                                    ? itemTypeList[param.itemType]
                                    : "전체"
                            }
                            onSelect={handleItemType}
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
                                param.itemType
                                    ? itemTypeList[param.itemType]
                                    : "물품"
                            } 검색...`}
                            value={param.itemName}
                            name="itemName"
                            onChange={handleParam}
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
                        <th>유형</th>
                        <th>제목</th>
                        <th>물품명</th>
                        <th>물품 유형</th>
                        <th>최소 가격</th>
                        <th>현재/판매 가격</th>
                        <th>종료 시간</th>
                        <th>구매자</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {pageInfo.dtoList.map((d, idx) => (
                        <tr key={idx}>
                            <td>{pageInfo.current * 10 + idx + 1}</td>
                            <td>{auctionTypeList[d.auctionType]}</td>
                            <td>{d.title}</td>
                            <td>{d.item.name}</td>
                            <td>{itemTypeList[d.item.type]}</td>
                            <td>{KRW(d.minPrice)}</td>
                            <td>{KRW(d.price)}</td>
                            <td>{d.endTime}</td>
                            <td>{d.buyer ? d.buyer.name : null}</td>
                            <td>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: `${
                                            auctionStatusColorList[d.status]
                                        }`,
                                    }}
                                >
                                    {auctionStatusTypeList[d.status]}
                                </span>
                            </td>
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

export default AuctionListComponent;
