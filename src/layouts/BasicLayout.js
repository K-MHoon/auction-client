import React from "react";
import BasicMenu from "../components/menus/BasicMenu";
import { Container } from "react-bootstrap";

const BasicLayout = ({ children }) => {
    return (
        <>
            <BasicMenu></BasicMenu>
            <Container>
                <main>{children}</main>
            </Container>
        </>
    );
};

export default BasicLayout;
