import React from "react";
import { Button, Modal } from "react-bootstrap";

const ResultModal = ({ flag, title, content, callbackFn }) => {
    return (
        <Modal show={flag}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={() => {
                        if (callbackFn) {
                            callbackFn();
                        }
                    }}
                >
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResultModal;
