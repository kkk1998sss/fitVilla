/**
 * Transformations gallery page. Can reuse TransformationsSection or extended gallery.
 */

export const metadata = {
  title: "Transformations | FitVilla",
  description: "Real members, real results – see FitVilla transformations.",
};

export default function TransformationsPage() {
  return (
    <main className="bg-black">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/page-hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="100vw"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/85 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(45,212,228,0.12),transparent_55%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-fitvilla-cyan">
            Real Results
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transformations
          </h1>
          <p className="mt-6 text-lg text-fitvilla-light/90 sm:text-xl">
            Real members, real results — see what&apos;s possible at FitVilla.
          </p>
        </div>
      </section>
      <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-2xl text-center text-fitvilla-light/90">Gallery – structure only.</p>
      </section>
    </main>
  );
}
