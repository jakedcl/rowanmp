import Link from "next/link";

export default function RecordNotFound() {
  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-5xl px-5 py-14">
        <h1 className="text-[1.5rem] font-bold">Record not found</h1>
        <p className="mt-3 text-[0.95rem] text-muted">
          That sleeve doesn’t exist, or the link is wrong.
        </p>
        <p className="mt-6 text-[0.95rem]">
          <Link href="/" className="no-underline hover:underline">
            ← Back to the wall
          </Link>
        </p>
      </div>
    </div>
  );
}
