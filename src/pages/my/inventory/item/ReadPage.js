import React from "react";
import Title from "../../../../components/common/Title";
import ReadComponent from "../../../../components/my/inventory/item/ReadComponent";
import { useParams } from "react-router-dom";

const ReadPage = () => {
    const { seq } = useParams();

    return (
        <>
            <Title title="아이템 조회하기" />
            <ReadComponent seq={seq} />
        </>
    );
};

export default ReadPage;
