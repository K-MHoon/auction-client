import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { getCookie } from "../util/cookieUtil";

const SOCKET_URL = "ws://localhost:8080/api/user/ws";

const useCustomSocket = () => {
    const client = useRef({});

    const disconnect = () => {
        client.current.deactivate();
        console.log("연결이 종료되었습니다.");
    };

    const connect = (subscribeObj) => {
        client.current = new Client({
            connectHeaders: {
                Authorization: `Bearer ${getCookie("member").accessToken}`,
            },
            brokerURL: SOCKET_URL,
            onConnect: () => {
                console.log("연결 성공");
                subscribeObj.map((obj) => {
                    client.current.subscribe(obj.key, obj.func);
                });
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });
        client.current.activate();
    };

    return { client, connect, disconnect };
};

export default useCustomSocket;
