import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      <div className="bg-blue-400  border-y border-black relative overflow-hidden">
        {/* <div className="marquee flex whitespace-nowrap">
          {Array(20)
            .fill("live trade begins")
            .map((txt, i) => (
              <span key={i} className="mx-4 text-lg font-bold text-black">
                {txt}
              </span>
            ))}
        </div> */}
      </div>
      <div className="">{children}</div>
      <Footer />
      <style jsx>{`
        .marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}
