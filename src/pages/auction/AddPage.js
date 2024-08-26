import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import Title from "../../components/common/Title";
import AddComponent from "../../components/auction/AddComponent";
import { useParams } from "react-router-dom";

const AddPage = () => {
    const { ino } = useParams();

    return (
        <BasicLayout>
            <Title title="경매 시작하기" />
            <AddComponent ino={ino} />
        </BasicLayout>
    );
};

export default AddPage;
