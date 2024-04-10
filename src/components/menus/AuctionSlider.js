import React, { useState } from "react";
import Slider from "react-slick";
import "./AuctionSlider.css";

const AuctionSlider = () => {
    const [auctions, setAuctions] = useState([
        {
            id: 1,
            title: "경매1",
            description: "설명1",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            title: "경매2",
            description: "설명2",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 3,
            title: "경매3",
            description: "설명3",
            image: "https://via.placeholder.com/150",
        },
        {
            id: 4,
            title: "경매4",
            description: "설명4",
            image: "https://via.placeholder.com/150",
        },
    ]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        centerMode: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
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
        <Slider {...settings}>
            {auctions.map((auction) => (
                <div key={auction.id}>
                    <img src={auction.image} alt={auction.title} />
                    <h3>{auction.title}</h3>
                    <p>{auction.description}</p>
                </div>
            ))}
        </Slider>
    );
};

export default AuctionSlider;
