import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";  // Update the import path as needed
import { useAuth } from "../react-query/useAuth";
import { Link } from 'react-router-dom';
import Banner from "../components/HomeComponents/Banner";
import '../stylez/SignUp.css'
// import '../stylez'
const SignUpPage = () => {
    const { signUp, isSigningUp, signUpError, signUpErrorMsg } = useAuth();  // Replace with your sign-up logic
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("email: ", email);
            await signUp({ email, password, firstName, lastName });
            // Navigate logic here
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <FormContainer>
            {/* <Banner /> */}
            <h1 style={{color:'white'}}>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='firstName'>
                    <Form.Label style={{color:'white'}} className="form-label-background">First Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='lastName'>
                    <Form.Label style={{color:'white'}} className="form-label-background">Last Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter your last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label style={{color:'white'}} className="form-label-background">Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label style={{color:'white'}} className="form-label-background">Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-center align-items-center">
                <Button type='submit' disabled={isSigningUp} style={{marginTop:"5px"}}>
                    {isSigningUp ? 'Signing up...' : 'Sign Up'}
                </Button>
                <Button variant="secondary" style={{marginTop:"5px", marginLeft:"5px", marginRight:"5px"}}>
                    Sign Up as Owner
                </Button>
                <Button as={Link} to='/signin' style={{marginTop:"5px", backgroundColor: 'red', borderColor: 'red'}}>
                    Sign In
                </Button>
            </div>
            {/* ... (rest of the code)
        </FormContainer> */}

                {/* <Link to="/signin" style={{ marginTop: '5px'}}>
                    <Button style={{marginTop:"5px", display: 'block',  backgroundColor: 'red', borderColor: 'red' }}>
                        Sign In
                    </Button> */}
                {/* </Link> */}
            </Form>
            {/* {signUpError && <p>Error: {signUpErrorMsg}</p>} */}
        </FormContainer>
    );
};

export default SignUpPage;
