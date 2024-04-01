import React, { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const AuctionList = lazy(() => import("../pages/member/AuctionListPage"));
const Inventory = lazy(() => import("../pages/member/InventoryPage"));

const memberRouter = () => {
    return [
        {
            path: "login",
            element: (
                <Suspense fallback={Loading}>
                    <Login />
                </Suspense>
            ),
        },
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
        },
    ];
};
export default memberRouter;
