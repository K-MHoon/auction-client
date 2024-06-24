import React, { useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import SearchBar from "../components/menus/SearchBar";
import { Button, Row, Col } from "react-bootstrap";
import AuctionSlider from "../components/menus/AuctionSlider";
import useCustomLogin from "../hooks/useCustomLogin";
import ListComponent from "../components/auction/ListComponent";

const MainPage = () => {
    const { isLogin, moveToLoginReturn } = useCustomLogin();

    if (!isLogin) {
        return moveToLoginReturn();
    }

    return (
        <BasicLayout>
            <AuctionSlider />
            <div
                style={{
                    marginTop: "30px",
                    marginBottom: "30px",
                    padding: "50px",
                    border: "10px solid rgba(10, 88, 202, 0.8)",
                    borderRadius: "30px",
                }}
            >
                <ListComponent />
            </div>
        </BasicLayout>
    );
};

export default MainPage;
