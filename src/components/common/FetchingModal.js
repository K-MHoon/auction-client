import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const FetchingModal = ({ flag }) => {
    return (
        <Modal show={flag}>
            <Modal.Body>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </Modal.Body>
        </Modal>
    );
};

export default FetchingModal;
