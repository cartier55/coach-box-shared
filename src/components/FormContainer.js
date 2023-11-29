import { Col, Container, Row } from "react-bootstrap";


const FormContainer = ({children}) => {
    return ( 
        <Container style={{marginTop:"65px"}}>
            <Row className="justify-content-md-center">
                <Col xs={12} md={5}>
                {children}
                </Col>
            </Row>
        </Container>
     );
}
 
export default FormContainer;