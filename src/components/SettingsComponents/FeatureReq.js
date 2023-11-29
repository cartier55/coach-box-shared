import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import useFeatureReq from '../../react-query/useFeatureReq';

const FeatureRequest = () => {
    const [featureTitle, setFeatureTitle] = useState("");
    const [featureBody, setFeatureBody] = useState("");
    const { createFeatureRequest, isLoading, isError, error } = useFeatureReq();

    const handleSubmit = (e) => {
        e.preventDefault();
        createFeatureRequest(featureTitle, featureBody);
    };


    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Feature Request</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="featureTitle">
                    <Form.Label>Feature Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the title of the feature"
                        value={featureTitle}
                        onChange={(e) => setFeatureTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="featureBody">
                    <Form.Label>Describe the Feature</Form.Label>
                    <div style={{ width: '100%', maxWidth: '85vw' }}> {/* This will ensure the width never exceeds the screen width */}
                        <ReactQuill 
                            value={featureBody} 
                            onChange={setFeatureBody} 
                            theme="snow"
                        />
                    </div>
                </Form.Group>
                <Button type="submit" style={{marginTop:"10px"}}>Submit Feature Request</Button>
            </Form>
        </Container>
    );
}

export default FeatureRequest;
