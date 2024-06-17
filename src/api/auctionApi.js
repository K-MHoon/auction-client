import { API_SERVER_HOST } from "./info";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/service`;

export const auctionAdd = async (auction) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await jwtAxios.post(`${host}/auction`, auction, header);
    return res.data;
};

export const auctionSliderListGet = async () => {
    const res = await jwtAxios.get(`${host}/auction/slider`);
    return res.data;
};

export const auctionListGet = async (itemType, auctionTitle, page, size) => {
    const res = await jwtAxios.get(
        `${host}/auction?item-type=${itemType}&title=${auctionTitle}&page=${page}&size=${size}`
    );
    return res.data;
};
