import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // BFF layer URL

/*
export const postData = async (products) => {

  try {
    const response = await axios.post(`${API_BASE_URL}/products`, products);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};*/
export const postData = async (products) => {
  try {
    console.log("Posting data to BFF:", products); // Debug log
    const response = await axios.post(`${API_BASE_URL}/products`, products, {
      headers: {
        "Content-Type": "application/json", // Explicitly set content type
      },
    });
    console.log("BFF response:", response.data); // Debug response
    return response.data;
  } catch (error) {
    console.error("Error in Axios POST request:", error.response || error.message);
    throw error;
  }
};


export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.products;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


/*import axios from 'axios';

const BFF_URL = 'http://localhost:3001/products'; // Update this to your BFF URL

export const fetchData = async () => {
    const response = await axios.get(BFF_URL);
    return response.data;
};

export const postData = async (data) => {
    const response = await axios.post(BFF_URL, data);
    return response.data;
};*/
