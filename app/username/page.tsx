'use client';

import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GameContext } from '../../context/GameContext';

const Username = () => {
  const [username, setUsername] = useState('');
  const { setUsername: setContextUsername } = useContext(GameContext);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContextUsername(username);
    router.push('/');
  };

  return (
    <div>
      <h1 className="text-2xl text-center">What should we call you?</h1>

      <form className="flex flex-col p-2" onSubmit={handleSubmit}>
        <input
          placeholder="Enter your name"
          name="userName"
          type="text"
          required
          minLength={3}
          maxLength={20}
          className="mb-5 bg-white border border-slate-700 rounded py-2 px-4"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
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

export default Username;
