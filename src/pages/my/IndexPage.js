import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
    return (
        <BasicLayout>
            <Outlet />
        </BasicLayout>
    );
};

export default IndexPage;
