import React, { useEffect, useState } from 'react';
import UserRow from '../components/AdminComponents/UserRow';
import { useAdmin } from '../react-query/useAdmin';
import { useQueryClient } from 'react-query';
import styles from '../stylez/AdminPage.module.css';

const UsersPage = () => {
    const { users, isLoading, isError, error } = useAdmin();
    const [webSocket, setWebSocket] = useState(null);
    const queryClient = useQueryClient();


    
    const getStoredToken = () => {
        return localStorage.getItem('accessToken'); // or however you store your token
    };

useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket('wss://coachify-api.graytecknologies.com/api/admin/ws');
    // const ws = new WebSocket('wss://localhost:8000/api/admin/ws');
    setWebSocket(ws);

    // Handle WebSocket events
    ws.onopen = () => {
        console.log('WebSocket connected');
        // Send the token as the first message
        const token = getStoredToken();
        if (token) {
            ws.send(JSON.stringify({ token }));
        } else {
            console.error('Access token not found');
            ws.close(); // Close the connection if there's no token
        }
    };

    ws.onmessage = (event) => {
        console.log('Received message:', event.data);
        const message = JSON.parse(event.data); // Parse the incoming message string into a JavaScript object
        
        if (message.message === "user_status_update") {
            // Assuming 'users' is the queryKey for the admin user list
            queryClient.setQueryData(['Users'], (oldQueryData) => {
            // Update the specific user's data with the new status
            return oldQueryData.map((user) => {
                if (user.id === message.user_id) {
                // Only update 'welcomed' if it's included in the message
                const updatedUser = { ...user, isActive: message.isActive };
                if ('welcomed' in message) {
                    updatedUser.welcomed = message.welcomed;
                }
                return updatedUser;
                }
                return user;
            });
            });
        }
        };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket disconnected');
    };

    // Clean up WebSocket connection when the hook is no longer used
    return () => {
        if (ws) {
        ws.close();
        }
        setWebSocket(null);
    };
    // }, [queryClient]);
}, []);


    // console.log(data);
    console.log(users);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{background:"#f4f7f6"}}>
            {users.map((user, index) => (
                <UserRow key={index} user={user} />
            ))}
        </div>
    );
}

export default UsersPage;