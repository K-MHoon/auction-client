import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import memberRouter from "./memberRouter";
import couponRouter from "./couponRouter";
import auctionRouter from "./auctionRouter";
import myRouter from "./myRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const Member = lazy(() => import("../pages/member/IndexPage"));
const My = lazy(() => import("../pages/my/IndexPage"));
const root = createBrowserRouter([
    {
        path: "",
        element: (
            <Suspense fallback={Loading}>
                <Main />
            </Suspense>
        ),
    },
    {
        path: "member",
        element: (
            <Suspense fallback={Loading}>
                <Member />
            </Suspense>
        ),
        children: memberRouter(),
    },
    {
        path: "my",
        element: (
            <Suspense fallback={Loading}>
                <My />
            </Suspense>
        ),
        children: myRouter(),
    },
    {
        path: "auction",
        children: auctionRouter(),
    },
    {
        path: "coupon",
        children: couponRouter(),
    },
]);

export default root;
