import React, { useState } from "react";
import { Nav, Modal, Tab } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';

import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

const GetStarted = (props) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <Button animated size='massive'>
                <Button.Content visible>Get Started</Button.Content>
                <Button.Content hidden onClick={() => setShowModal(true)}>
                    <Icon name='hand point up outline' />
                </Button.Content>
            </Button>
        
            {/* set modal data up */}
            <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            aria-labelledby="signup-modal"
            >
            {/* tab container to do either signup or login component */}
            <Tab.Container defaultActiveKey="signup">
                <Modal.Header closeButton>
                <Modal.Title id="signup-modal">
                    <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link eventKey="login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                    </Nav.Item>
                    </Nav>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Tab.Content>
                    <Tab.Pane eventKey="login">
                    <LoginForm handleModalClose={() => setShowModal(false)} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="signup">
                    <SignUpForm handleModalClose={() => setShowModal(false)} />
                    </Tab.Pane>
                </Tab.Content>
                </Modal.Body>
            </Tab.Container>
            </Modal>
        </>
    )
};

export default GetStarted;