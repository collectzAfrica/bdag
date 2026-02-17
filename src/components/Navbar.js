"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BtnGold, BtnOutline, Logo, StatusDot } from "./BlockDag";
import { useRouter } from "next/router";

function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const links = [
    { label: "CLAIM", href: "wallets" },
    { label: "STAKE", href: "wallets" },
    { label: "IMPORT TOKEN", href: "wallets" },
    { label: "RECTIFY", href: "wallets" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-[rgba(3,13,67,0.9)] backdrop-blur-2xl border-b border-[rgba(6,214,245,0.12)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-orbitron font-black text-white text-lg tracking-wider group-hover:text-cyan-400 transition-colors">
            BLOCKDAG
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <BtnOutline
              key={l.label}
              href={l.href}
              className="text-[0.62rem] py-1.5 px-3"
            >
              {l.label}
            </BtnOutline>
          ))}
        </div>

        {/* Wallet */}
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs font-mono text-green-400">
            <StatusDot /> Mainnet Live
          </span>
          <BtnGold
            onClick={() => router.push("/wallets")}
            className="py-1.5 px-5 text-[0.65rem]"
          >
            {"CONNECT WALLET"}
          </BtnGold>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-cyan-400 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[rgba(3,13,67,0.97)] border-t border-[rgba(6,214,245,0.12)] px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-center font-orbitron text-[0.65rem] tracking-widest text-cyan-400 border border-cyan-400/40 rounded-md py-2.5 hover:bg-cyan-400/8 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <BtnGold
            onClick={() => {
              router.push("/wallets");
              setOpen(false);
            }}
            className="w-full py-2.5"
          >
            {"CONNECT WALLET"}
          </BtnGold>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const navItems = [
//     { href: "#about", label: "About Us", bgColor: "bg-yellow-200" },
//     { href: "#faq", label: "FAQ", bgColor: "bg-purple-200" },
//     { href: "#tokenomics", label: "Tokenomics", bgColor: "bg-pink-200" },
//     { href: "/777k-giveaway", label: "777k giveaway", bgColor: "bg-green-200" },
//     { href: "/", label: "Home", bgColor: "bg-red-200" },
//   ];

//   return (
//     <>
//       <header className="flex items-center justify-between px-4 py-3 md:px-12 bg-sky-400  sticky top-0 z-40">
//         <Link href={"/"} className="flex items-center gap-2">
//           <Image src="/lilpepe/main.png" alt="logo" width={48} height={48} />
//           <span className="text-2xl font-extrabold text-green-700 drop-shadow">
//             LITTLE PEPE
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-3">
//           {navItems.map((item, index) => (
//             <Link href={item.href} key={index}>
//               <button
//                 className={`rounded-lg px-4 py-2 ${item.bgColor} font-bold border-2 border-black shadow hover:scale-105 transition-transform`}
//               >
//                 {item.label}
//               </button>
//             </Link>
//           ))}
//           <Link
//             href={"/wallets"}
//             className="rounded-lg px-4 py-2 bg-green-700 text-white font-bold border-2 border-black shadow hover:scale-105 transition-transform"
//           >
//             Connect Wallet
//           </Link>
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden z-50">
//           <button
//             onClick={toggleMobileMenu}
//             className="text-3xl hover:scale-110 transition-transform"
//             aria-label="Toggle mobile menu"
//           >
//             {isMobileMenuOpen ? "✕" : "☰"}
//           </button>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden fixed inset-0 z-40">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-black/50"
//             onClick={closeMobileMenu}
//           />

//           {/* Mobile Menu */}
//           <div className="absolute top-0 right-0 w-64 h-full bg-white border-l-2 border-black shadow-xl">
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-6">
//                 <span className="text-lg font-bold text-green-700">Menu</span>
//                 <button
//                   onClick={closeMobileMenu}
//                   className="text-2xl hover:scale-110 transition-transform"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <nav className="flex flex-col gap-3">
//                 {navItems.map((item, index) => (
//                   <Link href={item.href} key={index} onClick={closeMobileMenu}>
//                     <button
//                       className={`w-full rounded-lg px-4 py-3 ${item.bgColor} font-bold border-2 border-black shadow text-left hover:scale-105 transition-transform`}
//                     >
//                       {item.label}
//                     </button>
//                   </Link>
//                 ))}
//                 <Link
//                   href={"/wallets"}
//                   className="w-full rounded-lg px-4 py-3 bg-green-700 text-white font-bold border-2 border-black shadow hover:scale-105 transition-transform"
//                 >
//                   Connect Wallet
//                 </Link>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
