import { API_SERVER_HOST } from "./info";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/service`;

export const auctionAdd = async (auction) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await jwtAxios.post(`${host}/auction`, auction, header);
    return res.data;
};
