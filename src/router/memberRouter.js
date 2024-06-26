import React, { Suspense, lazy } from "react";
import inventoryRouter from "./inventoryRouter";

const Loading = <div>Loading....</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Register = lazy(() => import("../pages/member/RegisterPage"));

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
            path: "register",
            element: (
                <Suspense fallback={Loading}>
                    <Register />
                </Suspense>
            ),
        },
    ];
};
export default memberRouter;
