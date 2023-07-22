import React from 'react';



const Form = () => {
  return (
    <form className="flex flex-col p-2">
      <label htmlFor="userName" className="mb-1">
        Name
      </label>
      <input
        id="userName"
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
  );
};

export default Form;
