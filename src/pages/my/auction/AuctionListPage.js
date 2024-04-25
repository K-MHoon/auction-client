import React from "react";
import AuctionListComponent from "../../../components/members/AuctionListComponent";
import Title from "../../../components/common/Title";

const AuctionListPage = () => {
    return (
        <>
            <Title title="내 경매 목록" />
            <AuctionListComponent />
        </>
    );
};

export default AuctionListPage;
