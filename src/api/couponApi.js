import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./info";

const host = `${API_SERVER_HOST}/api/service`;

export const couponBuy = async (buyInfo) => {
    const res = await jwtAxios.post(`${host}/coupon`, buyInfo);
    return res.data;
};
