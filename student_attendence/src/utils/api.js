// const BASE_URL = 'https://10.0.3.2:5000/api/v1'; // Replace with your API base URL

const ngrokUrl = 'https://eb92-2409-40e3-100f-ab20-8c96-6a73-388f-27f.ngrok-free.app'
const BASE_URL = `${ngrokUrl}/api/v1`;

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

    console.log("response", response)
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fetchDataByQuery = async (endpoint, queryParams) => {
  try {
    var url = `${BASE_URL}/${endpoint}`;
    url = new URL(url);

    Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    console.log(url,)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    // console.log(data, "data at api")
    return data;
  } catch (error) {
    console.log("error at fetchDataByQuery", error)
  }
}
// module.exports= trial