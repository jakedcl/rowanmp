import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
};

type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  summary?: string | null;
};

const CATEGORY_LABEL: Record<string, string> = {
  announcement: "Announcement",
  publication: "Publication",
  project: "Project",
  talk: "Talk",
  other: "Other",
};

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function PostsPage() {
  const [{ data: settingsData }, { data: postsData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: POSTS_QUERY }),
  ]);

  const settings = settingsData as SiteSettings | null;
  const posts = (postsData as PostListItem[] | null) ?? [];

  const name = settings?.name ?? "Rowan Mentley-Peters";

  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-[42rem] px-5 py-10 sm:px-6 sm:py-14">
        <SiteHeader
          name={name}
          tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
          email={settings?.email ?? "mentrs635@oneonta.edu"}
          cvUrl={settings?.cvUrl}
        />

        <main className="py-10">
          <h2 className="text-sm font-bold uppercase tracking-[0.06em]">
            Posts
          </h2>
          <p className="mt-2 text-[0.9rem] text-muted">
            Publications, projects, talks, and announcements.
          </p>

          {posts.length === 0 ? (
            <div className="mt-8 border border-rule bg-[#ebe8e0] px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
              <p className="font-bold text-foreground">No posts yet</p>
              <p className="mt-2">
                Add one in <a href="/studio">Studio</a> → Posts.
              </p>
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-rule border-y border-rule">
              {posts.map((post) => (
                <li key={post._id}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block py-5 text-foreground no-underline transition hover:bg-[#ebe8e0]/mx-[-0.75rem] px-3"
                  >
                    <p className="text-[0.8rem] uppercase tracking-[0.04em] text-muted">
                      {CATEGORY_LABEL[post.category] ?? post.category}
                      <span className="mx-2 text-rule" aria-hidden>
                        ·
                      </span>
                      {formatDate(post.publishedAt)}
                    </p>
                    <p className="mt-1 text-[1.05rem] font-bold leading-snug">
                      {post.title}
                    </p>
                    {post.summary ? (
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                        {post.summary}
                      </p>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </main>

        <footer className="border-t border-rule pt-6 text-[0.8rem] text-muted">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
        </footer>
      </div>
    </div>
  );
}
