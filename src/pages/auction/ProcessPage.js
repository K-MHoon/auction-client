import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import Title from "../../components/common/Title";
import ProcessComponent from "../../components/auction/ProcessComponent";
import { useParams } from "react-router-dom";

const ProcessPage = () => {
    const { pno } = useParams();

    return (
        <BasicLayout>
            <Title title="경매방" />
            <ProcessComponent pno={pno} />
        </BasicLayout>
    );
};

export default ProcessPage;
