'use client';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

import Link from 'next/link';

export default function Home() {
  const { username } = useContext(UserContext);

  return (
    <div className="flex flex-col align-middle">
      <h1 className="text-center text-4xl mb-5">The N-Back Game</h1>

      {username && (
        <>
          <p className="text-center mb-5">Welcome back {username}</p>
          <Link
            href="/game"
            className="text-center text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
          >
            Lets Play!
          </Link>
          <Link
            href="/username"
            className="text-right text-sm italic mt-2 hover:underline transition-all"
          >
            Not you?
          </Link>
        </>
      )}

      {!username && (
        <Link
          href="/username"
          className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
        >
          Enter a username
        </Link>
      )}
    </div>
  );
}
