import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import signinState from "../atoms/signinState";
import { loginPost } from "../api/memberApi";
import { Navigate } from "react-router-dom";
import { removeCookie, setCookie } from "../util/cookieUtil";

const useCustomLogin = () => {
    const navigate = useNavigate();

    const [loginState, setLoginState] = useRecoilState(signinState);

    const resetState = useResetRecoilState(signinState);

    const isLogin = loginState.email ? true : false;

    const doLogin = async (loginParam) => {
        const result = await loginPost(loginParam);

        console.log(result);

        saveAsCookie(result);

        return result;
    };

    const saveAsCookie = (data) => {
        setCookie("member", JSON.stringify(data), 1);
        setLoginState(data);
    };

    const doLogout = () => {
        removeCookie("member");
        resetState();
    };

    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace: true });
    };

    const moveToLogin = () => {
        navigate({ pathname: "/member/login" }, { replace: true });
    };

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login" />;
    };

    const exceptionHandler = (ex) => {
        console.log("Exception");
        console.log(ex);
        const errorMsg = ex.response.data.error;
        const errorStr = createSearchParams({ error: errorMsg }).toString();

        if (errorMsg === "REQUIRE_LOGIN") {
            alert("로그인 해야만 합니다.");
            navigate({ pathname: "/member/login", search: errorStr });
            return;
        }

        if (errorMsg === "ERROR_ACCESS_DENIED") {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
            navigate({ pathname: "member/login", search: errorStr });
            return;
        }
    };

    return {
        loginState,
        isLogin,
        doLogin,
        doLogout,
        moveToPath,
        moveToLogin,
        moveToLoginReturn,
        exceptionHandler,
        saveAsCookie,
    };
};

export default useCustomLogin;
