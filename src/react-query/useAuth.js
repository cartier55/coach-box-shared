import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { signin, signup, signout, updateUser, sendPfp } from '../services/api_auth';
import { toast } from 'react-toastify';
import { fetchDailyVideo, fetchNxtEvent, fetchWeeklyPDF } from '../services/api_data';

export const useAuth = () => {
    const navigate = useNavigate();
const {state} = useLocation();
    const queryClient = useQueryClient();
const from = state?.from?.pathname || '/';
    
    // Check if the user is authenticated based on local storage
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('userData'));
  
    const signinMutation = useMutation(signin, {
        onSuccess: () => {
            // After successful login, before navigating to the Home page
            // Prefetch daily video, weekly PDF, and events
            queryClient.prefetchQuery('dailyVideo', fetchDailyVideo);
            queryClient.prefetchQuery('weeklyPDF', fetchWeeklyPDF);
            queryClient.prefetchQuery(['nextEvent'], fetchNxtEvent);
            navigate(from);

        },
        onError: (error) => {
            // Create an error toast when signin encounters an error
            console.log(error.response.data.detail);
            toast.error(error.response.data.detail);
        },
    });
    const signupMutation = useMutation(signup, {
        onSuccess: () => {
            navigate('/');
        },
        onError: (error) => {
            // Create an error toast when signup encounters an error
            console.log(error.response.data.detail);
            toast.error(error.response.data.detail);
        },
    });
    const signoutMutation = useMutation(signout, {
        onSuccess: () => {
            // Create a success toast when signout is successful
            toast.success('You have been signed out successfully.');
            navigate('/signin');
        },
    });    
    const updateUserMutation  = useMutation(updateUser, {
        onSuccess: () => {
            // Create a success toast when updateUser is successful
            toast.success('User details have been updated successfully.');
        },
        onError: (error) => {
            // Create an error toast when updateUser encounters an error
            toast.error(error.response.data.detail);
        },
    });

    const signIn = async (credentials) => {
        try{
            await signinMutation.mutateAsync(credentials);
        }catch (error){
            console.log('Sign-in failed:', error);
        }
    };

    const signUp = async (userDetails) => {
        try {
        await signupMutation.mutateAsync(userDetails);
        } catch (error) {
        console.error('Sign-up failed:', error);
        }
    };

    const signOut = async () => {
        await signoutMutation.mutateAsync();
        // navigate('/signin');
    };
    
    const updateUserDetails = async (updateData, profilePictureFile) => {
        try {
            const hasDataToUpdate = Object.values(updateData).some((value) => value !== "");
            if (profilePictureFile) {
                try {
                    const formData = new FormData();
                    formData.append('file', profilePictureFile); // Ensure the field name is "file"
                    await sendPfp(formData);
                    if (!hasDataToUpdate) {                       
                        toast.success('User details have been updated successfully.');
                    }
                } catch (error) {
                    toast.error('Error uploading profile picture');
                }
            }
            // Check if there's any data to update in updateData
    
            if (hasDataToUpdate) {
                // Send the user details to update using updateUser function
                await updateUserMutation.mutateAsync(updateData);
            } else {
                // No data to update, display a message or handle as needed
                console.log('No data to update');
            }
        } catch (error) {
            console.error('Update user failed:', error);
        }
    };
    


    return {
        isAuthenticated,
        userData,
        signIn,
        signUp,
        signOut,
        updateUserDetails, // Expose this function to components
        isSigningIn: signinMutation.isLoading,
        isSigningUp: signupMutation.isLoading,
        isSigningOut: signoutMutation.isLoading,
        signInError: signinMutation.isError,
        signUpError: signupMutation.isError,
        signOutError: signoutMutation.isError,
        signInErrorMsg: signinMutation.error,
        signUpErrorMsg: signupMutation.error,
        signOutErrorMsg: signoutMutation.error,
        // ...other returns like isLoading, isError, etc. based on your mutations' state
  };
};

