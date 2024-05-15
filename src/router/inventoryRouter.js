import React, { Suspense, lazy } from "react";
import itemRouter from "./itemRouter";

const Loading = <div>Loading....</div>;
const Add = lazy(() => import("../pages/my/inventory/AddPage"));
const Inventory = lazy(() => import("../pages/my/inventory/InventoryPage"));

const inventoryRouter = () => {
    return [
        {
            path: "",
            element: (
                <Suspense fallback={Loading}>
                    <Inventory />
                </Suspense>
            ),
        },
        {
            path: "add",
            element: (
                <Suspense fallback={Loading}>
                    <Add />
                </Suspense>
            ),
        },
        {
            path: "item",
            children: itemRouter(),
        },
    ];
};
export default inventoryRouter;
