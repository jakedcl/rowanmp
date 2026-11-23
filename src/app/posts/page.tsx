import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Posts",
  description:
    "Publications, projects, talks, and announcements from Rowan Mentley-Peters.",
};
import { SiteShell } from "@/components/SiteShell";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type {
  POSTS_QUERY_RESULT,
  SITE_SETTINGS_QUERY_RESULT,
} from "../../../sanity.types";

const CATEGORY_LABEL: Record<string, string> = {
  announcement: "Announcement",
  publication: "Publication",
  project: "Project",
  talk: "Talk",
  other: "Other",
};

function formatDate(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default async function PostsPage() {
  const [{ data: settingsData }, { data: postsData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: POSTS_QUERY }),
  ]);

  const settings = settingsData as SITE_SETTINGS_QUERY_RESULT;
  const posts = (postsData as POSTS_QUERY_RESULT | null) ?? [];
  const name = settings?.name ?? "Rowan Mentley-Peters";

  return (
    <SiteShell
      name={name}
      tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
      email={settings?.email ?? "mentrs635@oneonta.edu"}
      cvUrl={settings?.cvUrl}
      active="posts"
    >
      <main>
        <h1 className="section-label">Posts</h1>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
          Publications, projects, talks, and announcements.
        </p>

        {posts.length === 0 ? (
          <div className="mt-8 border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
            <p className="font-bold text-foreground">No posts yet</p>
            <p className="mt-2">
              Add one in <Link href="/studio">Studio</Link> → Posts.
            </p>
          </div>
        ) : (
          <ul className="mt-8 divide-y divide-rule border-y border-rule">
            {posts.map((post, index) => (
              <Reveal key={post._id} as="li" delayMs={index * 50}>
                <Link
                  href={`/posts/${post.slug ?? ""}`}
                  className="post-row group grid grid-cols-[4.5rem_1fr] gap-4 py-5 text-foreground no-underline sm:grid-cols-[5.5rem_1fr] sm:gap-6"
                >
                  <span className="pt-0.5 text-[0.8rem] leading-snug tabular-nums text-muted">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span>
                    <span className="block text-[0.75rem] uppercase tracking-[0.05em] text-muted">
                      {CATEGORY_LABEL[post.category ?? "other"] ??
                        post.category}
                    </span>
                    <span className="post-title mt-1 block text-[1.1rem] font-bold leading-snug">
                      {post.title}
                    </span>
                    {post.summary ? (
                      <span className="mt-2 block text-[0.95rem] leading-relaxed text-muted">
                        {post.summary}
                      </span>
                    ) : null}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </main>
    </SiteShell>
  );
}
