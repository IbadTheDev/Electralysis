import axiosInstance from './axiosInstance'; 

interface SignUpRequest {
  fullName: string;
  password: string;
  Mobile: string;
}

interface SignUpResponse {
  success: boolean;
  message: string;
}

export const signUpUser = async (userData: SignUpRequest): Promise<SignUpResponse> => {
  try {
    console.log('Request payload:', userData);
    const response = await axiosInstance.post<SignUpResponse>('/Auth/SignUp', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up', error);
    throw error;
  }
};

export default signUpUser;