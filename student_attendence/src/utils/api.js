// const BASE_URL = 'https://10.0.3.2:5000/api/v1'; // Replace with your API base URL
const BASE_URL = 'https://447e-2409-40e3-1f-491a-ac17-da8-1ed9-c196.ngrok.io/api/v1'; // 
// const BASE_URL = 'http://localhost:5000'; // 


// Function to make a GET request

export const fetchData = async (endpoint, queryParams = {}) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required (e.g., authorization headers)
      },
      // You can append query parameters to the URL here
      // Example: If queryParams = { page: 1, limit: 10 }, add it to the URL
      // Example URL: https://api.example.com/endpoint?page=1&limit=10
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    console.log("response",response)
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    console.error('Error fetching data:', error);
    throw error; // Propagate the error for handling in the calling code
  }
};

// Function to make a POST request
export const postData = async (endpoint, bodyData = {}) => {
  try {
    const url = `${BASE_URL}/${endpoint}`;
    console.log(url)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// module.exports= trial