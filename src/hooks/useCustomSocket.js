import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { jwtHeader } from "../util/jwtUtil";

const SOCKET_URL = "ws://localhost:8080/api/user/ws";

const useCustomSocket = () => {
    const client = useRef({});

    const disconnect = () => {
        client.current.deactivate();
        console.log("연결이 종료되었습니다.");
    };

    useEffect(() => {
        const connect = () => {
            client.current = new Client({
                connectHeaders: {
                    Authorization: jwtHeader,
                },
                brokerURL: SOCKET_URL,
                onConnect: () => {
                    console.log("연결 성공");
                },
                onStompError: (frame) => {
                    console.error(frame);
                },
            });
            client.current.activate();
        };

        connect();

        return () => disconnect();
    }, []);

    return { client };
};

export default useCustomSocket;
