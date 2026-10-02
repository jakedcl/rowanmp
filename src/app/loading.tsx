export default function Loading() {
  return (
    <div className="site-atmosphere min-h-svh">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <p className="font-serif text-2xl text-foreground/70">Loading</p>
        <div className="mt-10 space-y-10" aria-hidden>
          {[0, 1, 2].map((row) => (
            <div key={row}>
              <div className="h-3 w-28 bg-panel" />
              <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-5">
                {[0, 1, 2].map((tile) => (
                  <div key={tile} className="aspect-square bg-panel" />
                ))}
              </div>
              <div className="mt-1 h-5 bg-[#4a3222]/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
