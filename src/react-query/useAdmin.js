// useAdmin.js
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getUsers } from '../services/api_data';
import { verifyAdmin } from '../services/api_auth';



export const useAdmin = () => {
  const queryKey = ['Users'];
  const queryClient = useQueryClient();
  const [adminVerificationError, setAdminVerificationError] = useState(null);


const verify = async () => {
    // try {
    const result = await verifyAdmin();
    if (result == 'invalid'){
        setAdminVerificationError(true);
        console.log('invalid')
    }else{
        setAdminVerificationError(false);
        console.log('valid')
    }
    // } catch (error) {
    //     console.log('err err err')
    //     setAdminVerificationError(true);
    // }
};

  const { data, isLoading, isError, error, refetch } = useQuery(
    queryKey,
    getUsers,
    {
      refetchOnWindowFocus: true,
    }
  );

  

  return {
    users: data || [],
    isFetchingAdmin: isLoading,
    verify, // Expose the verifyAdmin function
    adminVerificationError,
    isError,
    error,
    refetch, // You can expose refetch if you want to allow manual refetching
    // webSocket, // Optionally expose WebSocket if you want to allow sending messages from components
  };
};
