import { getCookie } from "../util/cookieUtil";
import { atom } from "recoil";

const initState = {
    email: "",
    name: "",
    accessToken: "",
    refreshToken: "",
};

const loadMemberCookie = () => {
    const memberInfo = getCookie("member");

    if (memberInfo && memberInfo.name) {
        memberInfo.name = decodeURIComponent(memberInfo.name);
    }

    return memberInfo;
};

const signinState = atom({
    key: "signinState",
    default: loadMemberCookie() || initState,
});

export default signinState;
