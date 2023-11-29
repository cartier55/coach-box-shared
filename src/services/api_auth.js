import { authInstance, dataInstance } from './axiosInstance';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import { toast } from 'react-toastify';

export const signin = async ({ email, password }) => {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      formData.append("grant_type", "password");  // Add your grant_type here
  
      // const response = await authInstance.post('https://coachify-api.graytecknologies.com/api/auth/signin', formData, {
      const response = await authInstance.post('/signin', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'  // Important when you're using FormData
        }
      });
  
      if (response.status === 200 && response.data.access_token) {
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));  // Assuming server returns user data
        return response.data;
      }
      return response.data;
    } catch (error) {
      // Handle error
      console.log(error)
      throw error;
    }
  };

  export const signup = async ({email, password, firstName, lastName, userType}) => {
    try {
        const userData = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            type: "coach"  // Assuming the server expects this in the request body
        };

        const response = await authInstance.post('/signup', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200 && response.data.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('userData', JSON.stringify(response.data.user));  // Assuming server returns user data
            return response.data;
        }
        return null;
    } catch (error) {
        // Handle error
        console.log(error)
        throw error
    }
};

  

  export const signout = async () => {
    try {
      const response = await authInstance.post('/signout');
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('userData');
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      // Handle error
      // console.log('api_auth.js signout error', error)
      return false;
    }finally{
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userData');
    }
  };

  export const updateUser = async (updateData) => {
    try {
      // Filter updateData to include only non-empty string values
      const filteredUpdateData = Object.entries(updateData).reduce(
        (acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      // Send PATCH request to update user details
      const response = await dataInstance.patch('/auth/update-details', filteredUpdateData);
      
      if (response.status === 200) {
        // Assuming that the server returns updated user data
        const updatedUserData = response.data;
        
        // Optionally update userData in local storage if needed
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        
        return updatedUserData;
      }
      return null;
    } catch (error) {
      // Handle error
      console.error(error);
      throw error;
    }
  };

  export const sendPfp = async (formData) => {
    try {
        const response = await dataInstance.post('/auth/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            // Assuming the server returns the updated user data with the new image_url
            const updatedUserData = response.data;
            
            // Update the image_url in localStorage
            const storedUserData = JSON.parse(localStorage.getItem('userData'));
            storedUserData.image_url = updatedUserData.image_url;
            localStorage.setItem('userData', JSON.stringify(storedUserData));

            return response.data;
        }
        return null;
    } catch (error) {
        // Handle error
        console.error('Failed to upload profile picture:', error);
        return null;
    }
};

export const verifyAdmin = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await authInstance.get('/admin/verify', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      return 'valid';
    } else {
      return 'invalid';
    }
  } catch (error) {
    if (error.response) {
      return 'invalid';
    } else {
      return 'invalid';
    }
  }
};



  export const refreshToken = async () => {
    // const history = useHistory(); // Initialize useHistory

    try {
      const response = await authInstance.post('/refresh');
      
      if (response.status === 200 && response.data.access_token) {
        // Save new access token to local storage
        localStorage.setItem('accessToken', response.data.access_token);
        
        return response.data.access_token;
      }
    } catch (error) {
      console.log('api_auth.js refreshToken error', error)
      console.log(error.response.data.detail)
      if (error.response.status === 401 && error.response.headers['x-refresh-expired'] === 'True') {
        console.log('Refresh token expired. Logout user.')
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        window.location.href = '/signin';

        // Refresh token is also expired. Handle logout or redirection to login page here
        return false;
      }else if(error.response.status === 401 && error.response.data.detail == 'Refresh token not found'){
        console.log('Refresh token not found. Logout user.')
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        window.location.href = '/signin';

        // Refresh token is also expired. Handle logout or redirection to login page here
        return false;

      }
      return false;
    }
  }