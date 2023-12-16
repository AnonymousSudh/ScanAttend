const API_BASE_URL = 'http://localhost:5000/api/v1'; // Replace with your backend URL

export const PostData = async (url,data) => {
  try {
    // console.log("data",data)
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