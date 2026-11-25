import axios from 'axios';

interface ApiErrorResponse {
  message?: string | string[];
}

export function getPasskeyErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message;
    if (typeof message === 'string') {
      return message;
    }
    if (Array.isArray(message)) {
      return message.join(', ');
    }
  }

  if (error instanceof DOMException) {
    switch (error.name) {
      case 'NotAllowedError':
        return 'The passkey prompt was cancelled or timed out. Please try again.';
      case 'InvalidStateError':
        return 'This device already has a passkey for this account. Please sign in instead.';
      case 'NotSupportedError':
        return 'This device does not support passkeys.';
      case 'SecurityError':
        return 'Passkeys are not allowed on this domain. Check the WebAuthn RP ID and origin settings.';
    }
  }

  return fallback;
}
