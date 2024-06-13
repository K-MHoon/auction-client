import React, { useState } from "react";
import Slider from "react-slick";
import "./AuctionSlider.css";
import { useQuery } from "@tanstack/react-query";
import { auctionListGet } from "../../api/auctionApi";
import FetchingModal from "../common/FetchingModal";
import { Card, FormControl, Row, Stack } from "react-bootstrap";
import { API_SERVER_HOST } from "../../api/info";

const initState = {
    sequence: 0,
    title: "",
    minPrice: "",
    price: "",
    auctionImageList: [{ fileName: "" }],
    seller: "",
    startTime: "",
};

const AuctionSlider = () => {
    const query = useQuery({
        queryKey: ["auctions"],
        queryFn: () => auctionListGet(),
        staleTime: 1000 * 10 * 60,
        retry: 1,
    });

    const data = query.data || [initState];

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

    return (
        <>
            <FetchingModal flag={query.isFetching} />
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
                                        (₩){auction.minPrice}
                                    </div>
                                    <div
                                        style={{
                                            color: "red",
                                            fontWeight: "bold",
                                            fontSize: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        (₩){auction.price ? auction.price : 0}
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
