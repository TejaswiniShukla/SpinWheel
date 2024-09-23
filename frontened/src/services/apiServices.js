import { axiosInstance } from "./axiosInstance";

export const setTargetNumber = async (target) => {
  try {
    const response = await axiosInstance.post('/set-target', { target });
    return response.data;
  } catch (error) {
    console.error('Error setting target number:', error);
    throw error;
  }
};

export const getTargetNumber = async () => {
  try {
    const response = await axiosInstance.get('/get-target');
    return response.data;
  } catch (error) {
    console.error('Error fetching target number:', error);
    throw error;
  }
};
