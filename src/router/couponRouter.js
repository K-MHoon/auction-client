import React, { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Coupon = lazy(() => import("../pages/coupon/CouponPage"));

const couponRouter = () => {
    return [
        {
            path: "",
            element: (
                <Suspense fallback={Loading}>
                    <Coupon />
                </Suspense>
            ),
        },
    ];
};
export default couponRouter;
