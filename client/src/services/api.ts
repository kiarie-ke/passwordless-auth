import axios from 'axios';
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/browser';

interface User {
  id: string;
  email: string;
}

interface RegistrationVerification {
  verified: boolean;
  user: User;
}

interface AuthenticationVerification {
  accessToken: string;
  user: User;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const webAuthnApi = {
  async getRegistrationOptions(
    email: string,
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    const response = await api.post<PublicKeyCredentialCreationOptionsJSON>(
      '/auth/register/options',
      { email },
    );
    return response.data;
  },

  async verifyRegistration(
    email: string,
    response: RegistrationResponseJSON,
  ): Promise<RegistrationVerification> {
    const result = await api.post<RegistrationVerification>(
      '/auth/register/verify',
      { email, response },
    );
    return result.data;
  },

  async getAuthenticationOptions(
    email: string,
  ): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const response = await api.post<PublicKeyCredentialRequestOptionsJSON>(
      '/auth/login/options',
      { email },
    );
    return response.data;
  },

  async verifyAuthentication(
    email: string,
    response: AuthenticationResponseJSON,
  ): Promise<AuthenticationVerification> {
    const result = await api.post<AuthenticationVerification>(
      '/auth/login/verify',
      { email, response },
    );
    return result.data;
  },
};

api.interceptors.request.use((config) => {
  const token =
    typeof window === 'undefined' ? null : window.localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
