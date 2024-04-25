import React from "react";
import Title from "../../../components/common/Title";
import InventoryComponent from "../../../components/my/inventory/InventoryComponent";

const InventoryPage = () => {
    return (
        <>
            <Title title="내 인벤토리" />
            <InventoryComponent />
        </>
    );
};

export default InventoryPage;
