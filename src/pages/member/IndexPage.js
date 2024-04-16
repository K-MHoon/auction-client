import React from "react";
import "./IndexPage.css";
import { Image } from "react-bootstrap";
import background from "../../images/shiba_auction.png";
import { Outlet } from "react-router-dom";

const IndexPage = () => {
    return (
        <>
            <Image
                src={background}
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "absolute",
                }}
            ></Image>
            <Outlet />
        </>
    );
};

export default IndexPage;
