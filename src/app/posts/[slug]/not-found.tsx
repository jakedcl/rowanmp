import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-[42rem] px-5 py-14">
        <h1 className="text-[1.5rem] font-bold">Post not found</h1>
        <p className="mt-3 text-[0.95rem] text-muted">
          That post doesn’t exist, or the link is wrong.
        </p>
        <p className="mt-6 text-[0.95rem]">
          <Link href="/posts" className="no-underline hover:underline">
            ← Back to posts
          </Link>
        </p>
      </div>
    </div>
  );
}
