import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import AuctionListComponent from "../../components/members/AuctionListComponent";
import Title from "../../components/common/Title";

const AuctionListPage = () => {
    return (
        <BasicLayout>
            <Title title="내 경매 목록" />
            <AuctionListComponent />
        </BasicLayout>
    );
};

export default AuctionListPage;
