import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./info";

const host = `${API_SERVER_HOST}/api/service`;

export const itemAdd = async (item) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await jwtAxios.post(`${host}/item`, item, header);
    return res.data;
};

export const itemDelete = async (seqList) => {
    const res = await jwtAxios.delete(`${host}/item`, {
        data: {
            seqList: seqList,
        },
    });
    return res.data;
};

export const itemGet = async (seq) => {
    const res = await jwtAxios.get(`${host}/item/${seq}`);
    return res.data;
};

export const fileGet = async (fileName) => {
    const res = await axios.get(
        `${API_SERVER_HOST}/api/view/item/${fileName}`,
        {
            responseType: "blob",
        }
    );
    return res.data;
};
