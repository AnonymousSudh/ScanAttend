const API_BASE_URL = 'http://localhost:5000/api/v1'; // Replace with your backend URL

export const PostData = async (url,data) => {
  try {
    console.log("data",data)
    const response = await fetch(`${API_BASE_URL}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log("response",response)
    return response.json();
  } catch (error) {
    console.log("Error at api.js POST request")
    console.log(error)
    throw new Error(error.message);
  }
};

export const getData = async (url) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return response.json();
  } catch (error) {
    console.log('Error at GET request:', error.message);
    throw new Error(error.message);
  }
};

export const fetchDataByQuery = async (endpoint, queryParams) => {
  try {
    var url = `${API_BASE_URL}/${endpoint}`;
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
