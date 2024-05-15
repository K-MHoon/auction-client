import React, { Suspense, lazy } from "react";
import inventoryRouter from "./inventoryRouter";

const Loading = <div>Loading....</div>;
const AuctionList = lazy(() => import("../pages/my/auction/AuctionListPage"));

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
            children: inventoryRouter(),
        },
    ];
};
export default myRouter;
