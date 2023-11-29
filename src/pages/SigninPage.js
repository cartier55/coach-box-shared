import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useAuth } from "../react-query/useAuth";
import Banner from "../components/HomeComponents/Banner";
import { Link } from 'react-router-dom';
// import { useLocation, useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const { signIn, isSigningIn, signInError, signInErrorMsg } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        await signIn({ email, password });
            // The navigate logic is handled within signIn function in the hook
      } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <FormContainer>
            {/* <Banner /> */}
            <h1 style={{color:'white'}}>Sign In</h1>
            <Form onSubmit={handleSubmit}>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        type='submit'
                        disabled={isSigningIn || !email || !password} // Add the condition here
                        style={{marginTop:"5px", marginRight:"10px"}}
                    >
                        {isSigningIn ? 'Signing in...' : 'Sign In'}
                    </Button>
                    <Button as={Link} to='/signup' style={{marginTop:"5px", backgroundColor: 'red', borderColor: 'red'}}>
                    Sign Up
                  </Button>
                </div>
            </Form>
            {/* {signInError && <p>Error: {signInErrorMsg}</p>} */}
        </FormContainer>
    );
};

export default SignInPage;
