import React from "react";
import BasicMenu from "../components/menus/BasicMenu";

const BasicLayout = ({ children }) => {
    return (
        <>
            <BasicMenu></BasicMenu>
            <div className="bg-white my-3 w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <main className="bg-sky-300 md:w-full lg:w-full px-5 py-40">
                    {children}
                </main>
            </div>
        </>
    );
};

export default BasicLayout;
