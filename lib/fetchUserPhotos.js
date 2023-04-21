import axios from "axios";

export default async function fetchUserPhotos(kreativeIdKey) {
  let response;

  try {
    response = await axios.get(
      `https://id-api.kreativeusa.com/v1/photos/user`,
      {
        headers: {
          KREATIVE_ID_KEY: kreativeIdKey,
          KREATIVE_APPCHAIN: process.env.NEXT_PUBLIC_APPCHAIN,
          KREATIVE_AIDN: process.env.NEXT_PUBLIC_AIDN,
        },
      }
    );
  } catch (error) {
    if (error.response) {
      console.log("Error fetching user photos", error.response.data);
      throw new Error(error.response.data);
    } else {
      console.log("Error fetching user photos", error);
      throw new Error(error);
    }
  }

  return response.data.data.photos;
}
