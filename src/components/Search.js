import Link from "next/link";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Search() {
  const [data, setData] = useState("");
  const [searched, setSearched] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(data);
  };
  const handleChange = (e) => {
    setData(e.target.value);
    setSearched(null);
  };
  return (
    <main className="relative">
      <form
        className="bg-white w-full md:h-20 h-12 flex items-center rounded-md p-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="text"
          value={data}
          onChange={handleChange}
          className="w-[90%] md:w-[95%] h-full text-black p-2 border-none outline-none"
          placeholder="search for any problem here..."
        />
        <button type="submit">
          <FiSearch className="text-primary text-xl cursor-pointer" />
        </button>
      </form>
      {searched && (
        <section className="bg-white text-black rounded-md p-8 absolute z-20 top-[105%] w-full flex flex-col gap-4">
          <p className="w-full break-words"> {searched}? </p>
          <Link href="/wallets" className="underline text-blue-600 ">
            connect wallet to continue
          </Link>
        </section>
      )}
    </main>
  );
}
