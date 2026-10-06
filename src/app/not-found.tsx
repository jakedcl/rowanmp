import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
        <h1 className="text-[1.5rem] font-bold tracking-tight">Page not found</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
          That page doesn’t exist, or the link is wrong.
        </p>
        <p className="mt-6 text-[0.95rem]">
          <Link href="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
