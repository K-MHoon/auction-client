import React, { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
const Add = lazy(() => import("../pages/my/inventory/AddPage"));

const inventoryRouter = () => {
    return [
        {
            path: "add",
            element: (
                <Suspense fallback={Loading}>
                    <Add />
                </Suspense>
            ),
        },
    ];
};
export default inventoryRouter;
