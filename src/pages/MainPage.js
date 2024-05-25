import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import SearchBar from "../components/menus/SearchBar";
import { Button, Row, Col } from "react-bootstrap";
import AuctionSlider from "../components/menus/AuctionSlider";
import useCustomLogin from "../hooks/useCustomLogin";

const MainPage = () => {
    const { isLogin, moveToLoginReturn } = useCustomLogin();

    if (!isLogin) {
        return moveToLoginReturn();
    }

    return (
        <BasicLayout>
            <SearchBar />
            <AuctionSlider />
            <Row>
                <Col
                    style={{
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <Button variant="primary">경매 시작하기</Button>
                </Col>
            </Row>
        </BasicLayout>
    );
};

export default MainPage;
