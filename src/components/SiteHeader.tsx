import Link from "next/link";

type Props = {
  name: string;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
};

export function SiteHeader({ name, tagline, email, cvUrl }: Props) {
  return (
    <header className="border-b border-rule pb-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <h1 className="text-[1.5rem] font-bold leading-tight tracking-tight sm:text-[1.75rem]">
            <Link href="/" className="text-foreground no-underline hover:text-foreground">
              {name}
            </Link>
          </h1>
          {tagline ? (
            <p className="mt-1 text-[0.9rem] leading-snug text-muted">{tagline}</p>
          ) : null}
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[0.9rem]" aria-label="Site">
          <Link href="/" className="no-underline hover:underline">
            Home
          </Link>
          <Link href="/posts" className="no-underline hover:underline">
            Posts
          </Link>
          {cvUrl ? (
            <a
              href={cvUrl}
              className="no-underline hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              CV
            </a>
          ) : null}
          {email ? (
            <a href={`mailto:${email}`} className="no-underline hover:underline">
              Contact
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
