import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import CouponComponent from "../../components/coupon/CouponComponent";
import Title from "../../components/common/Title";

const CouponPage = () => {
    return (
        <BasicLayout>
            <Title title="경매 쿠폰 구매하기" />
            <CouponComponent />
        </BasicLayout>
    );
};

export default CouponPage;
