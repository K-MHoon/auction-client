import React from "react";
import RegisterComponent from "../../components/members/RegisterComponent";

const RegisterPage = () => {
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
            <RegisterComponent />
        </div>
    );
};

export default RegisterPage;
