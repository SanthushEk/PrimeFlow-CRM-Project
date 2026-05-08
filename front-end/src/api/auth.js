import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const logoutUser = async () => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};