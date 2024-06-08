import { QueryClient, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fileGet, itemGet, itemHistoryGet } from "../../../../api/itemApi";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import FormTextBox from "../../../common/FormTextBox";
import FetchingModal from "../../../common/FetchingModal";
import { API_SERVER_HOST } from "../../../../api/info";
import docImage from "../../../../images/document.png";
import HistoryModal from "./HistoryModal";

const host = API_SERVER_HOST;
const initState = {
    sequence: 0,
    name: "",
    description: "",
    type: "",
    isUse: false,
    createdBy: "",
    createdAt: "",
    itemImageList: [],
    itemDocumentList: [],
};

const ReadComponent = ({ seq }) => {
    const [showHistory, setShowHistory] = useState(false);

    const query = useQuery({
        queryKey: ["item", seq],
        queryFn: () => itemGet(seq),
        staleTime: 1000 * 10 * 60,
        retry: 1,
    });

    const data = query.data || initState;

    const getSubstringAfterUnderscore = (str) => {
        const index = str.indexOf("_");
        return str.substring(index + 1);
    };

    const handleDownload = async (fileName) => {
        try {
            const res = await fileGet(fileName);
            const url = window.URL.createObjectURL(new Blob([res]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download Error", err);
        }
    };

    console.log(showHistory);

    return (
        <>
            <HistoryModal
                flag={showHistory}
                flagFn={() => setShowHistory}
                seq={seq}
            />
            <FetchingModal flag={query.isFetching} />
            <Row md={8} className="p-3 text-center justify-content-md-center">
                <Form.Label
                    style={{
                        textAlign: "center",
                        marginBottom: 20,
                        fontSize: "30px",
                        fontWeight: "bold",
                    }}
                >
                    상품 정보(Information)
                </Form.Label>
                <Row
                    style={{
                        border: "5px solid black",
                        borderRadius: "20px",
                        padding: "30px",
                    }}
                >
                    <FormTextBox
                        name="물품 유형"
                        readOnly={true}
                        value={data.type}
                    />
                    <FormTextBox
                        name="물품 명"
                        readOnly={true}
                        value={data.name}
                    />
                    <FormTextBox
                        name="물품 설명"
                        readOnly={true}
                        value={data.description}
                    />
                    <FormTextBox
                        name="생성자"
                        readOnly={true}
                        value={data.createdBy}
                    />
                    <FormTextBox
                        name="생성시간"
                        readOnly={true}
                        value={data.createdAt}
                        isLast={true}
                    />
                </Row>

                {data.itemImageList.length > 0 ? (
                    <>
                        <Form.Label
                            style={{
                                textAlign: "center",
                                marginTop: 20,
                                marginBottom: 20,
                                fontSize: "30px",
                                fontWeight: "bold",
                            }}
                        >
                            상품 이미지(Image)
                        </Form.Label>
                        <Row
                            style={{
                                border: "5px solid black",
                                borderRadius: "20px",
                            }}
                        >
                            <Col>
                                {data.itemImageList.map((imgObj) => (
                                    <Image
                                        key={imgObj.ord}
                                        src={`${host}/api/view/item/${imgObj.fileName}`}
                                        width="200px"
                                        height="200px"
                                        style={{ margin: 10 }}
                                    />
                                ))}
                            </Col>
                        </Row>
                    </>
                ) : (
                    <></>
                )}
                {data.itemDocumentList.length > 0 ? (
                    <>
                        <Form.Label
                            style={{
                                textAlign: "center",
                                marginTop: 20,
                                marginBottom: 20,
                                fontSize: "30px",
                                fontWeight: "bold",
                            }}
                        >
                            상품 문서(Document)
                        </Form.Label>
                        <Row
                            style={{
                                border: "5px solid black",
                                borderRadius: "20px",
                            }}
                        >
                            <Col>
                                {data.itemDocumentList.map((docObj) => (
                                    <Card
                                        key={docObj.ord}
                                        style={{
                                            margin: 15,
                                            width: "150px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            handleDownload(docObj.fileName)
                                        }
                                    >
                                        <Card.Img src={docImage} />
                                        <Card.Body>
                                            <Card.Title>
                                                {getSubstringAfterUnderscore(
                                                    docObj.fileName
                                                )}
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>
                        </Row>
                    </>
                ) : (
                    <></>
                )}

                <Row
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: 30,
                        marginBottom: 30,
                    }}
                >
                    <Button
                        variant="outline-danger"
                        style={{ width: 150, height: 50, marginRight: 40 }}
                        onClick={() => setShowHistory(true)}
                    >
                        경매 시작하기
                    </Button>
                    <Button
                        variant="outline-success"
                        style={{ width: 150, height: 50, marginRight: 40 }}
                        onClick={() => setShowHistory(true)}
                    >
                        경매 이력 보기
                    </Button>
                    <Button
                        variant="outline-primary"
                        style={{ width: 150, height: 50 }}
                    >
                        목록으로
                    </Button>
                </Row>
            </Row>
        </>
    );
};

export default ReadComponent;
