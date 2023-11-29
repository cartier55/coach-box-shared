import { dataInstance } from './axiosInstance';

export const fetchEventsForMonth = async ({ month, year }) => {
    const { data } = await dataInstance.get('/events/events-for-month', {
      params: {
        month,
        year,
      },
    });
    return data;
  };


export const fetchEventsForBiWeekly = async ({startDate, endDate}) => {
    try {
      const response = await dataInstance.get('/events/events-in-range', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      return response.data;
    } catch (error) {
      console.error('An error occurred while fetching data: ', error);
    }
  };

export const fetchNxtEvent = async () => {
  try {
    const response = await dataInstance.get('/events/next-event');
    return response.data;
  } catch (error) {
    console.error('An error occurred while fetching the next event:', error);
    throw error;
  }
};


export async function createComment(commentData) {
  try {
    const response = await dataInstance.post('/comments', commentData);
    return response.data;
  } catch (error) {
    console.error(`Error creating comment: ${error}`);
    return null;
  }
}

export async function readComments(date) {
  try {
    const response = await dataInstance.get('/comments', {
      params: {
        date: date
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error reading comments: ${error}`);
    return null;
  }
}

// axios function to delete a comment
export async function deleteComment(commentId) {
  try {
    const response = await dataInstance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting comment: ${error}`);
    return null;
  }
}

export async function updateComment({id, updatedText}) {
  try {
    console.log('trying', updatedText)
    const response = await dataInstance.put(`/comments/${id}`, updatedText);
    return response.data;
  } catch (error) {
    console.error(`Error updating comment: ${error}`);
    return null;
  }
}

export const fetchImage = async (filename) => {
  try {
    const response = await dataInstance.get(`/images/${filename}`, { responseType: 'arraybuffer' });
    const base64 = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('There was a problem fetching the image:', error);
  }
};

export const sendFeatureRequest = async ({title:featureTitle, body:featureBody}) => {
  try {
      const response = await dataInstance.post('/feature-requests', {
          title: featureTitle,
          body: featureBody,
      });

      if (response.status === 201) {
          return response.data;
      }
      return null;
  } catch (error) {
      // Handle error
      console.error('Failed to send feature request:', error);
      return null;
  }
};

// Fetch the daily video link
export const fetchDailyVideo = async () => {
  const { data } = await dataInstance.get('/daily-prog');
  return data;
};

// Fetch the weekly PDF link
export const fetchWeeklyPDF = async () => {
  const { data } = await dataInstance.get('/wods-pdf');
  return data;
};

export const getUsers = async () => {
  try {
    const response = await dataInstance.get('/admin/get-users');
    return response.data;
  } catch (error) {
    // Handle error here if needed or rethrow to be handled by the calling function
    throw error;
  }
};

export const verifyAdmin = async () => {
  try {
    const response = await dataInstance.get('/admin/verify');
    // return response.status; // Returns the HTTP status code
    if (response.status === 200) {
      return 'valid';
    }else{
      return 'invalid';
    }
  } catch (error) {
    if (error.response) {
      // throw new Error(`Verification failed: ${error.response.status}`);
      return 'invalid';
    } else {
      // throw new Error('Network or server error');
      return 'invalid';
    }
  }
};