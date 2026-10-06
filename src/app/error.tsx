"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  void error;
  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
        <h1 className="text-[1.5rem] font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
          This page didn’t load. Try again in a moment.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 text-[0.95rem] text-link underline underline-offset-[3px]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
