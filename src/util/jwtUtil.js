import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/info";

const jwtAxios = axios.create();

const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST;
    const header = { headers: { Authorization: `Bearer ${accessToken}` } };
    const res = await axios.get(
        `${host}/api/user/refresh?refreshToken=${refreshToken}`,
        header
    );

    console.log(res.data);

    return res.data;
};

const beforeReq = (config) => {
    console.log("before request...............");
    const memberInfo = getCookie("member");

    if (!memberInfo) {
        console.log("Member NOT FOUND");
        return Promise.reject({
            response: {
                data: {
                    error: "REQUIRE_LOGIN",
                },
            },
        });
    }

    const { accessToken } = memberInfo;

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
};

const requestFail = (err) => {
    return Promise.reject(err);
};

const beforeRes = async (res) => {
    console.log("before return response");
    console.log(res);
    return res;
};

const responseFail = async (err) => {
    if (err.response.status === 401 && err.response.data.code === "S003") {
        const memberCookieValue = getCookie("member");

        const result = await refreshJWT(
            memberCookieValue.accessToken,
            memberCookieValue.refreshToken
        );
        console.log("refreshJWT RESULT", result);

        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        setCookie("member", JSON.stringify(memberCookieValue), 1);

        const originalRequest = err.config;

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

        return await axios(originalRequest);
    }
    return Promise.reject(err);
};

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
