import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./AuctionSlider.css";
import { useQuery } from "@tanstack/react-query";
import { auctionSliderListGet } from "../../api/auctionApi";
import FetchingModal from "../common/FetchingModal";
import { Card, Stack } from "react-bootstrap";
import { API_SERVER_HOST } from "../../api/info";
import { KRW } from "../common/CommonFunc";
import useCustomSocket from "../../hooks/useCustomSocket";
import AnimatedNumber from "../common/AnimatedNumber";

const initState = {
    sequence: 0,
    title: "",
    minPrice: 0,
    price: 0,
    auctionImageList: [{ fileName: "" }],
    seller: "",
    startTime: "",
};

const AuctionSlider = () => {
    const { connect, disconnect } = useCustomSocket();
    const [currentPrice, setCurrentPrice] = useState([]);

    const { data, isLoading, isFetched } = useQuery({
        queryKey: ["auctionSlider"],
        queryFn: () => auctionSliderListGet(),
        staleTime: 1000 * 10 * 60,
        retry: 1,
        placeholderData: [initState],
    });

    useEffect(() => {
        if (!isFetched) return;
        const updatedData = data.map((obj) => ({
            auctionSeq: obj.sequence,
            price: obj.price,
        }));
        setCurrentPrice([...updatedData]);
    }, [data, isFetched]);

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        centerMode: true,
        cssEase: "linear",
        autoplaySpeed: 2000,
        variableWidth: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const updateSliderPriceFunc = {
        key: `/sub/auction/slider/price`,
        func: (callback) => {
            const jsonBody = JSON.parse(callback.body);
            console.log(jsonBody);
            setCurrentPrice((prev) =>
                prev.map((obj) =>
                    obj.auctionSeq === jsonBody.auctionSeq
                        ? { ...obj, price: jsonBody.price }
                        : obj
                )
            );
        },
    };

    useEffect(() => {
        connect([updateSliderPriceFunc]);
        return () => disconnect();
    }, []);

    const getCurrentPrice = (auction) => {
        const idx = currentPrice.findIndex(
            (p) => p.auctionSeq === auction.sequence
        );
        if (idx === -1) {
            return auction.price;
        }
        return currentPrice[idx].price;
    };

    return (
        <>
            <FetchingModal flag={isLoading} />
            <Slider {...settings}>
                {data.map((auction) => (
                    <Card key={auction.sequence} style={{ width: "250px" }}>
                        <Card.Img
                            variant="top"
                            src={`${API_SERVER_HOST}/api/view/item/s_${
                                auction.auctionImageList[0]
                                    ? auction.auctionImageList[0].fileName
                                    : "default"
                            }`}
                        />
                        <Card.Body>
                            <Card.Title
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                {auction.title}
                            </Card.Title>
                            <Card.Text>
                                <Stack gap={2}>
                                    <div style={{ textAlign: "right" }}>
                                        {auction.seller.name}
                                    </div>
                                    <div
                                        style={{
                                            color: "blue",
                                            fontWeight: "bold",
                                            fontSize: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {KRW(auction.minPrice)}
                                    </div>
                                    <div
                                        style={{
                                            color: "red",
                                            fontWeight: "bold",
                                            fontSize: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <AnimatedNumber
                                            targetValue={getCurrentPrice(
                                                auction
                                            )}
                                            duration={1000}
                                        />
                                    </div>
                                </Stack>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Slider>
        </>
    );
};

export default AuctionSlider;
