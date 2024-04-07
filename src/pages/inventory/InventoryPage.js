import React from "react";
import BasicLayout from "../../layouts/BasicLayout";
import Title from "../../components/common/Title";
import InventoryComponent from "../../components/inventory/InventoryComponent";

const InventoryPage = () => {
    return (
        <BasicLayout>
            <Title title="내 인벤토리" />
            <InventoryComponent />
        </BasicLayout>
    );
};

export default InventoryPage;
