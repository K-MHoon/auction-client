import React, { useState } from "react";
import {
    Button,
    Col,
    Dropdown,
    DropdownButton,
    FormControl,
    InputGroup,
    Row,
} from "react-bootstrap";

const SearchBar = () => {
    const [auctionType, setAuctionType] = useState("");
    const [auctionTitle, setAuctionTitle] = useState("");

    const handleAuctionTypeSelect = (eventKey) => {
        setAuctionType(eventKey);
    };

    const handleAuctionTitleChange = (event) => {
        setAuctionTitle(event.target.value);
    };
    return (
        <Row className="d-flex justify-content-md-center p-5">
            <Col xs="auto" lg="2">
                <DropdownButton
                    id="dropdown-auction-type"
                    title={auctionType || "경매 유형"}
                    onSelect={handleAuctionTypeSelect}
                >
                    <Dropdown.Item eventKey="주택">주택</Dropdown.Item>
                    <Dropdown.Item eventKey="물건">물건</Dropdown.Item>
                    <Dropdown.Item eventKey="약">약</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col xs lg="5">
                <InputGroup>
                    <InputGroup.Text>제목</InputGroup.Text>
                    <FormControl
                        placeholder="제목 검색..."
                        value={auctionTitle}
                        onChange={handleAuctionTitleChange}
                    />
                    <Button variant="outline-secondary">검색</Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default SearchBar;
