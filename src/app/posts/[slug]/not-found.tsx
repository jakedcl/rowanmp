import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <h1 className="page-title">Post not found</h1>
        <p className="mt-4 text-[1.02rem] text-muted">
          That post doesn’t exist, or the link is wrong.
        </p>
        <p className="mt-6">
          <Link href="/posts" className="back-link">
            Back to Posts
          </Link>
        </p>
      </div>
    </div>
  );
}
