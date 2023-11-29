// useFeature.js
import { useMutation } from 'react-query';
import { sendFeatureRequest } from '../services/api_data';
import { toast } from 'react-toastify';


const useFeatureReq = () => {
    const mutation = useMutation(sendFeatureRequest, {
        onSuccess: () => {
            toast.success('Feature request submitted successfully.');
        },
        onError: (error) => {
            toast.error(`Oops! Looks like there was an problem`);
        },
    });
    
    const createFeatureRequest = async (featureTitle, featureBody) => {
        try {
        const response = await mutation.mutateAsync({
            title: featureTitle,
            body: featureBody,
        });
        return response;
        } catch (error) {
        // Handle error
        console.error('Failed to create feature request:', error);
        throw error;
        }
    };

    return { createFeatureRequest, ...mutation };
};

export default useFeatureReq;
