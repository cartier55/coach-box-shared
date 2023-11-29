import React from 'react';
import { Button } from "react-bootstrap";
import { useAuth } from '../../react-query/useAuth';

const SignOut = ({ className }) => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <Button variant="danger" className={className} onClick={signOut}>
          Log Out
        </Button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default SignOut;
