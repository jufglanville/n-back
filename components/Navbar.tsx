import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <div className="flex w-full bg-slate-600 p-5 align-middle justify-between">
      <Image src="/assets/memory.png" alt="logo" width="40" height="40" />
      <nav>
        <ul className="flex justify-center align-middle">
          <li className="flex align-middle">
            <Link
              href="/"
              className="mx-2 text-slate-300 border rounded py-2 px-4 hover:bg-slate-700 hover:text-slate-100 transition-all"
            >
              Home
            </Link>
          </li>
          <li className="flex align-middle">
            <Link
              href="/about"
              className="mx-2 text-slate-300 border rounded py-2 px-4 hover:bg-slate-700 hover:text-slate-100 transition-all"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
