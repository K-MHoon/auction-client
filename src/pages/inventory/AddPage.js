import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import Title from "../../components/common/Title";
import AddComponent from "../../components/inventory/AddComponent";

const AddPage = () => {
    return (
        <BasicLayout>
            <Title title="아이템 등록하기" />
            <AddComponent />
        </BasicLayout>
    );
};

export default AddPage;
