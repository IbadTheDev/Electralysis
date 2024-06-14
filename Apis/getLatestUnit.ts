import axios from './axiosInstance';

export const getLatestUnit = async (): Promise<number | null> => {
    try {
        const response = await axios.get('/ElectricityUsage/LatestUnit');
        return response.data;
    } catch (error) {
        console.error("Error fetching the latest unit data: ", error);
        return null;
    }
};