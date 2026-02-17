import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BtnOutline, Logo } from "./BlockDag";

function Footer() {
  return (
    <footer className="py-12 px-4 lg:px-8 border-t border-[rgba(6,214,245,0.1)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Logo />
              <span className="font-orbitron font-black text-white text-lg">
                BLOCKDAG
              </span>
            </div>
            <p className="text-slate-400 font-rajdhani text-sm leading-relaxed max-w-sm">
              Inspired by Bitcoin. Built beyond it. The world&rsquo;s most
              advanced Layer 1 blockchain — transparent, decentralized, and
              unstoppable.
            </p>
            <div className="flex gap-3 mt-4 flex-wrap">
              {["TWITTER", "TELEGRAM", "DISCORD"].map((s) => (
                <BtnOutline
                  key={s}
                  href="#"
                  className="text-[0.6rem] py-1.5 px-3"
                >
                  {s}
                </BtnOutline>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-orbitron text-white text-[0.65rem] font-bold mb-4 tracking-wider">
              PROTOCOL
            </h4>
            <ul className="space-y-2 text-sm font-rajdhani text-slate-400">
              {[
                ["#claim", "Claim Tokens"],
                ["#stake", "Staking"],
                ["#buy", "Buy BDAG"],
                ["#import", "Import Token"],
                ["#rectify", "Rectify Issues"],
              ].map(([h, l]) => (
                <li key={l}>
                  <a href={h} className="hover:text-cyan-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-orbitron text-white text-[0.65rem] font-bold mb-4 tracking-wider">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-sm font-rajdhani text-slate-400">
              {[
                "Whitepaper",
                "Explorer",
                "Documentation",
                "GitHub",
                "Audit Report",
              ].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs font-mono">
            © 2025 BlockDAG Network. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            BDAG is not financial advice. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
