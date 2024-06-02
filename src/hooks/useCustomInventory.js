import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import inventoryState from "../atoms/inventoryState";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getInventory } from "../api/inventoryApi";
import useCustomLogin from "./useCustomLogin";

const useCustomInventory = () => {
    const [inventory, setInventory] = useRecoilState(inventoryState);

    const queryClient = useQueryClient();
    const { moveToLogin } = useCustomLogin();

    const query = useQuery({
        queryKey: ["inventory"],
        queryFn: () => getInventory(),
        staleTime: 10000,
        gcTime: 10000,
    });

    useEffect(() => {
        console.log("2번호출");
        if (query.isSuccess) {
            queryClient.invalidateQueries("inventory");
            setInventory(query.data);
        }
        if (query.isError) {
            if (query.error.response.data.error === "REQUIRE_LOGIN") {
                moveToLogin();
            }
        }
    }, [query.isSuccess, query.data, query.isError, query.error]);

    return { inventory, query };
};

export default useCustomInventory;
