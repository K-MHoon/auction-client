import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./info";

const host = `${API_SERVER_HOST}/api/service`;

export const getInventory = async () => {
    const res = await jwtAxios.get(`${host}/inventory`);
    return res.data;
};
