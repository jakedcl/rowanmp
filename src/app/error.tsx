"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  void error;
  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <h1 className="page-title">Something went wrong</h1>
        <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-muted">
          This page didn’t load. Try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="cv-button"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
