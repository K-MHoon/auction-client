import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./info";

const host = `${API_SERVER_HOST}/api/service`;

export const itemAdd = async (item) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await jwtAxios.post(`${host}/item`, item, header);
    return res.data;
};
