import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import SignOut from "../components/SettingsComponents/SignOutBtn";
import { useAuth } from "../react-query/useAuth";
import { Link } from "react-router-dom";

const Settings = () => {
  const { isAuthenticated, userData } = useAuth();

  if (!isAuthenticated) {
    // You can redirect to login or show an error message here.
    return <div>Please login to access settings.</div>;
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Header>
              <h2>Settings</h2>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                Hi, {userData.first_name}  {/* Assuming userData has a field named first_name */}
              </Card.Title>
              <Link to="/update" className="btn btn-primary mb-2 w-100">Update Details</Link>
              <Link to="/request" className="btn btn-secondary mb-2 w-100">Feature Requests</Link>
              
              {/* Conditionally render the Admin Panel button */}
              {userData.is_admin && (
                <Link to="/admin/panel" className="btn btn-warning mb-2 w-100">Admin Panel</Link>
                )}

              <SignOut className="w-100" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Settings;
