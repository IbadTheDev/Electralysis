import axiosInstance from './axiosInstance';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignInResponse {
  success: boolean;
  message: string;
}

export const signInUser = async (
  userData: SignInRequest,
): Promise<SignInResponse> => {
  try {
    const response = await axiosInstance.post<SignInResponse>(
      '/Auth/SignIn',
      userData,
    );
    return response.data;
  } catch (error) {
    console.error('Error signing in', error);
    throw error;
  }
};

export default signInUser; // Exporting the Axios instance for potential reuse
