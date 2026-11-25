'use client';

import { browserSupportsWebAuthn, startRegistration } from '@simplewebauthn/browser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { webAuthnApi } from '@/services/api';
import { getPasskeyErrorMessage } from '@/services/passkey';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (!browserSupportsWebAuthn()) {
      setError('This browser does not support passkeys.');
      setLoading(false);
      return;
    }

    try {
      const options = await webAuthnApi.getRegistrationOptions(email);
      const registrationResponse = await startRegistration({
        optionsJSON: options,
      });
      const verification = await webAuthnApi.verifyRegistration(
        email,
        registrationResponse,
      );

      if (!verification.verified) {
        setError('Registration could not be verified. Please try again.');
        return;
      }

      router.push('/welcome');
    } catch (error: unknown) {
      console.error('Registration error:', error);
      setError(
        getPasskeyErrorMessage(
          error,
          'Registration failed. Please try again.',
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-sm">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Sign up</h1>
            <p className="mt-2 text-sm text-gray-600">Create your account</p>
          </div>

          <form onSubmit={handleRegistration} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Type your email"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#3B97B6] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2d7591] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Creating passkey...' : 'Create a passkey'}
            </button>
            <p className="text-center text-xs text-gray-500">
              You&apos;ll confirm with your fingerprint, face, or screen lock.
            </p>
          </form>

          <p className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link
              href="/signin"
              className="font-medium text-[#3B97B6] transition-colors hover:text-[#2d7591]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
