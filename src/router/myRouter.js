import React, { Suspense, lazy } from "react";
import inventoryRouter from "./inventoryRouter";

const Loading = <div>Loading....</div>;
const AuctionList = lazy(() => import("../pages/my/auction/AuctionListPage"));
const Inventory = lazy(() => import("../pages/my/inventory/InventoryPage"));

const myRouter = () => {
    return [
        {
            path: "auction/list",
            element: (
                <Suspense fallback={Loading}>
                    <AuctionList />
                </Suspense>
            ),
        },
        {
            path: "inventory",
            element: (
                <Suspense fallback={Loading}>
                    <Inventory />
                </Suspense>
            ),
            children: inventoryRouter(),
        },
    ];
};
export default myRouter;
