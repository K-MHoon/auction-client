import React, { useState } from "react";
import { Link } from "react-router-dom";

const BasicMenu = () => {
    const [loginState, useLoginState] = useState({ isLogin: true });

    return (
        <nav id="navbar" className="flex bg-blue-50 justify-end">
            <div className="w-4/5 bg-gray-500 ">
                <div className="flex p-6 text-white font-bold">
                    <span className="pr-6 text-2xl">Shiba Auction</span>
                </div>
            </div>
            {!loginState.isLogin ? (
                <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
                    <div className="text-white text-sm m-1 rounded">
                        <Link to={""}>로그인</Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-1/5 bg-blue-300 p-4 font-medium">
                        <div className="w-full text-center text-white text-sm m-1 rounded font-bold">
                            <Link to={""}>인벤토리</Link>
                        </div>
                    </div>
                    <div className="w-1/5 bg-green-300 p-4 font-medium">
                        <div className="w-full text-center text-white text-sm m-1 rounded font-bold">
                            <Link to={""}>내 경매</Link>
                        </div>
                    </div>
                    <div className="w-1/5 bg-pink-300 p-4 font-medium">
                        <div className="w-full text-center text-white text-sm m-1 rounded font-bold">
                            <Link to={""}>경매 쿠폰 구매</Link>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default BasicMenu;
