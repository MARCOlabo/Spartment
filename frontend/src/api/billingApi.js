import axios from "axios";

const API_URL =
  "http://localhost:5000/billing";


export async function getBillingData() {

  try {

    const response =
      await axios.get(API_URL);


    return response.data;

  } catch (error) {

    throw new Error(
      "Failed to retrieve billing information."
    );

  }

}