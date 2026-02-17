import { walletData } from "@/constants";
import Image from "next/image";
import React from "react";
import SingleWallets from "./SingleWallets";
import Link from "next/link";

export default function Wallet() {
  return (
    <main className="text-white bg-[rgba(3,13,67,0.9)] bg-cover bg-center">
      <header className="space-y-3">
        <p className="md:text-4xl text-2xl text-center font-extrabold">
          Connect wallet
        </p>
        <p className="  text-gray-500 text-center">
          Please connect your wallet to continue
        </p>
      </header>
      <section className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-10 my-14  ">
        {walletData.map((details, i) => {
          return <SingleWallets key={i} details={details} />;
        })}
      </section>
    </main>
  );
}
