import Link from 'next/link';

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/40 via-slate-950 to-slate-950"
      />

      <section className="relative w-full max-w-3xl text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-8 w-8"
          >
            <path
              d="M7 10V7a5 5 0 0 1 10 0v3m-11 0h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Zm6 4v3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="mb-4 text-sm font-semibold tracking-[0.24em] text-cyan-300 uppercase">
          Passwordless Auth
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          Sign in without a password.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Create an account and use a passkey to sign in securely with your
          fingerprint, face, or device screen lock.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-lg bg-cyan-400 px-7 py-3.5 font-semibold text-slate-950 transition-colors hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Create an account
          </Link>
          <Link
            href="/signin"
            className="rounded-lg border border-slate-600 px-7 py-3.5 font-semibold text-white transition-colors hover:border-slate-400 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Sign in
          </Link>
        </div>

        <p className="mt-10 text-sm text-slate-400">
          No password to remember. Your passkey stays protected by your device.
        </p>
      </section>
    </main>
  );
}
