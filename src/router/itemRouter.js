import React, { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Read = lazy(() => import("../pages/my/inventory/item/ReadPage"));

const itemRouter = () => {
    return [
        {
            path: ":seq",
            element: (
                <Suspense fallback={Loading}>
                    <Read />
                </Suspense>
            ),
        },
    ];
};

export default itemRouter;
