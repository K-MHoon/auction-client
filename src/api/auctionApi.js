import { API_SERVER_HOST } from "./info";
import jwtAxios from "../util/jwtUtil";

const host = `${API_SERVER_HOST}/api/service`;

export const auctionAdd = async (auction) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await jwtAxios.post(`${host}/auction`, auction, header);
    return res.data;
};

export const auctionGet = async (pno) => {
    const res = await jwtAxios.get(`${host}/auction/${pno}`);
    return res.data;
};

export const auctionUpdatePrice = async (auctionSeq, price) => {
    const res = await jwtAxios.post(`${host}/auction/${auctionSeq}/price`, {
        price,
    });
    return res.data;
};

export const auctionSliderListGet = async () => {
    const res = await jwtAxios.get(`${host}/auction/slider`);
    return res.data;
};

export const auctionListGet = async (itemType, itemName, page, size) => {
    const typeParam = itemType ? `item-type=${itemType}&` : ``;
    const nameParam = itemName ? `item-name=${itemName}&` : ``;

    const res = await jwtAxios.get(
        `${host}/auction?${typeParam}${nameParam}page=${page}&size=${size}`
    );
    return res.data;
};

export const myAuctionListGet = async (param, page, size) => {
    const auctionStatusParam = param.auctionStatus
        ? `auction-status=${param.auctionStatus}&`
        : ``;
    const auctionTypeParam = param.auctionType
        ? `auction-type=${param.auctionType}&`
        : ``;
    const itemTypeParam = param.itemType ? `item-type=${param.itemType}&` : ``;
    const itemNameParam = param.itemName ? `item-name=${param.itemName}&` : ``;

    const res = await jwtAxios.get(
        `${host}/auction/my?${itemTypeParam}${itemNameParam}${auctionTypeParam}${auctionStatusParam}page=${page}&size=${size}`
    );
    return res.data;
};
