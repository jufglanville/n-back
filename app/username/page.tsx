'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('asasaasa');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userName = formData.get('userName') as string;
    console.log(event.currentTarget);
    console.log(userName);
    setName(userName);
    router.push(`/game?userName=${encodeURIComponent(userName)}`);
  };

  return (
    <div>
      <h1 className="text-2xl ">What should we call you?</h1>

      <form className="flex flex-col p-2" onSubmit={handleSubmit}>
        <input
          name="userName"
          type="text"
          required
          minLength={3}
          maxLength={20}
          className="mb-5 bg-white border border-slate-700 rounded py-2 px-4"
        />

        <button
          type="submit"
          className="text-center  text-slate-900 border border-slate-900 rounded py-2 px-4 hover:bg-slate-600 hover:text-slate-100 transition-all"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default page;
