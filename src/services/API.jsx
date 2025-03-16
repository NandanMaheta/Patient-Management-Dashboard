import axios from "axios";

//fetching data from a mock API
export const fetchPatients = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
};
