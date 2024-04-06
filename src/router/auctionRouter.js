import React, { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Add = lazy(() => import("../pages/auction/AddPage"));
const Read = lazy(() => import("../pages/auction/ReadPage"));

const auctionRouter = () => {
    return [
        {
            path: "add",
            element: (
                <Suspense fallback={Loading}>
                    <Add />
                </Suspense>
            ),
        },
        {
            path: "read/:ino",
            element: (
                <Suspense fallback={Loading}>
                    <Read />
                </Suspense>
            ),
        },
    ];
};
export default auctionRouter;
