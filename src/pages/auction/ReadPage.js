import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import Title from "../../components/common/Title";
import AddComponent from "../../components/auction/AddComponent";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/auction/ReadComponent";

const ReadPage = () => {
    const { ino } = useParams();

    return (
        <BasicLayout>
            <Title title="경매 상세 정보 확인하기" />
            <ReadComponent ino={ino} />
        </BasicLayout>
    );
};

export default ReadPage;
