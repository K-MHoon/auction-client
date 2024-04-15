import React from "react";
import LoginComponent from "./../../components/members/LoginComponent";

const LoginPage = () => {
    return (
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
    );
};

export default LoginPage;
