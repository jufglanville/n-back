import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col align-middle">
      <h1 className="text-center text-4xl mb-10">The N-Back Game</h1>
      <Link
        href="/username"
        className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
      >
        Start
      </Link>
    </div>
  );
}
