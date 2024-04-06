import React from "react";
import { Table } from "react-bootstrap";

const items = [
    {
        sequence: 1,
        title: "아이템1",
        price: 1000000,
        status: "대기 중",
    },
    {
        sequence: 1,
        title: "아이템2",
        price: 2000000,
        status: "판매 완료",
    },
];

const AuctionListComponent = () => {
    return (
        <Table striped bordered hover>
            <thead className="text-center">
                <tr>
                    <th>제목</th>
                    <th>현재 낙찰 대기가</th>
                    <th>낙찰 상태</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {items.map((item) => (
                    <tr key={item.sequence}>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AuctionListComponent;
