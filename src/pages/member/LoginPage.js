import React from "react";
import LoginComponent from "../../components/members/LoginComponent";
import "./LoginPage.css";
import { Image } from "react-bootstrap";
import background from "../../images/shiba_auction.png";

const LoginPage = () => {
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
            <div
                style={{
                    height: "100vh",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <LoginComponent />
            </div>
        </>
    );
};

export default LoginPage;
