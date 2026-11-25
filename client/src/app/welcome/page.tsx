import Link from 'next/link';

export default function WelcomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight">You&apos;re all set</h1>
        <p className="text-sm text-gray-600">
          Your passkey is ready to use.
        </p>
        <Link
          href="/signin"
          className="inline-flex rounded-md bg-[#3B97B6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2d7591]"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
