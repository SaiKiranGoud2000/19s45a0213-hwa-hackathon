import Image from "next/image";
import Link from "next/link";

const sellingPoints = [
  {
    title: "Battery-free wind-up timer",
    text: "No batteries needed. Just wind it up and let the timer do the work.",
  },
  {
    title: "Six chambers with different puzzle actions",
    text: "Six chambers with different puzzle actions that keep every play session fresh.",
  },
  {
    title: "Easy to clean",
    text: "A quick wipe keeps the PawClock Tower ready for the next adventure.",
  },
];

function WindUpIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l8 8v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10z" />
      <circle cx="12" cy="8" r="3" />
    </svg>
  );
}

function CleanIcon() {
  return (
    <svg
      className="h-7 w-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 14c4-6 8-6 12 0-4 6-8 6-12 0z" />
      <path d="M13 6l3 3" />
    </svg>
  );
}

const icons = [WindUpIcon, PuzzleIcon, CleanIcon];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex items-center justify-between px-4 py-5 sm:px-8">
        <Link href="/" className="text-xl font-bold text-sky-600">PawClock</Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:text-sky-600">Home</Link>
          <Link href="/product" className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600">Shop the PawClock Tower</Link>
          <Link href="/cart" className="text-sm font-medium text-slate-700 hover:text-sky-600">Cart</Link>
        </nav>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative w-full">
          <Image
            src="/images/hero.jpg"
            alt="The PawClock Tower puzzle with a happy dog"
            width={1600}
            height={900}
            priority
            className="h-[55vh] w-full object-cover"
          />
          
          <div className="relative mx-auto max-w-3xl px-4 pt-16 text-center sm:px-8 sm:pt-24">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-700">The PawClock Tower</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Wind up. Puzzle on. Play all day.</h1>
            <p className="mt-4 text-lg text-slate-700">A battery-free wind-up puzzle that keeps your dog happily busy.</p>
            <Link href="/product" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-sky-500 px-8 text-base font-semibold text-white hover:bg-sky-600">Shop the PawClock Tower</Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Why the PawClock Tower?</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {sellingPoints.map((point, index) => {
              const Icon = icons[index];
              return (
                <div key={point.title} className="flex flex-col items-center rounded-2xl bg-sky-50 p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white">
                    <Icon />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{point.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-sky-100 px-4 py-8 text-center text-sm text-slate-500 sm:px-8">
        <p>PawClock - the PawClock Tower. Battery-free wind-up puzzle for dogs.</p>
      </footer>
    </div>
  );
}
