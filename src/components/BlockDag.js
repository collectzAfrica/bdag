/**
 * BlockDAG Landing Page — Next.js Component
 *
 * HOW TO USE:
 *   1. Copy this file to pages/index.js  (or any page you want)
 *   2. Copy the <style jsx global> block's CSS into your globals.css
 *      OR keep it here — it works both ways.
 *   3. Make sure Tailwind CSS is installed & configured in your project.
 *   4. No extra packages needed (uses only React hooks + next/head).
 *
 * Tailwind config additions (tailwind.config.js):
 *   theme: { extend: { fontFamily: {
 *     orbitron: ['Orbitron','sans-serif'],
 *     rajdhani: ['Rajdhani','sans-serif'],
 *     mono2: ['Share Tech Mono','monospace'],
 *   }}}
 */

import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const WALLETS = [
  {
    name: "BlockDAG Mainnet Team",
    addr: "0x35E7f8f1031B2Bf364A88fdE7FDDA80FCe8C3bBe",
    amount: "1,500,000,000",
    share: "1.5%",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
  },
  {
    name: "BlockDAG Mainnet MM Liquidity",
    addr: "0x4938DF5b0eaF8130CA128e480812c2cc5c70b6c4",
    amount: "4,500,000,000",
    share: "4.5%",
    color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  },
  {
    name: "BlockDAG Mainnet Treasury",
    addr: "0x14143445822f03796A7301B0cE5b437d3070474D",
    amount: "19,000,000,000",
    share: "19%",
    color: "text-green-400 border-green-400/30 bg-green-400/10",
  },
  {
    name: "BlockDAG Mainnet Special",
    addr: "0xd8A5D6Df7F3A1d57CDC9661f4a8132E9206B00D5",
    amount: "50,000,000,000",
    share: "50%",
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
  },
  {
    name: "BlockDAG Mainnet Staking Rewards",
    addr: "0xF417719986a694a71C3Ac3095c103802846c3fF4",
    amount: "25,000,000,000",
    share: "25%",
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
  },
];

const ALLOCATIONS = [
  {
    name: "Special Reserve",
    amount: "50,000,000,000",
    pct: "50%",
    bg: "rgba(245,197,24,0.15)",
    color: "#f5c518",
  },
  {
    name: "Staking Rewards",
    amount: "25,000,000,000",
    pct: "25%",
    bg: "rgba(168,85,247,0.15)",
    color: "#a855f7",
  },
  {
    name: "Treasury",
    amount: "19,000,000,000",
    pct: "19%",
    bg: "rgba(34,197,94,0.15)",
    color: "#22c55e",
  },
  {
    name: "MM Liquidity",
    amount: "4,500,000,000",
    pct: "4.5%",
    bg: "rgba(6,214,245,0.15)",
    color: "#06d6f5",
  },
  {
    name: "Team",
    amount: "1,500,000,000",
    pct: "1.5%",
    bg: "rgba(59,130,246,0.15)",
    color: "#3b82f6",
  },
];

const FAQS = [
  {
    q: "Tokens not showing in my wallet after claiming",
    a: "You need to import the BDAG token contract address manually. Go to the Import Token section and follow the instructions for MetaMask or Trust Wallet. Contract: 0x4938DF5b0eaF8130CA128e480812c2cc5c70b6c4",
  },
  {
    q: "My claim transaction is stuck / pending",
    a: 'This is usually due to a low gas price. In MetaMask click "Speed Up" and increase the gas fee. Alternatively cancel and retry with higher gas.',
  },
  {
    q: "My purchase is not reflected in my claimable balance",
    a: "Purchases take 1–3 block confirmations (~2 min) to index. If still wrong after 10 minutes, submit a rectification request with your TX hash.",
  },
  {
    q: "I bought from a different wallet than expected",
    a: "Claims are tied to the purchasing wallet. Connect the exact wallet used during presale. If you no longer have access, submit a rectification request with proof of purchase.",
  },
  {
    q: "Transaction reverted / failed during claim",
    a: "Reverts occur if the claim window hasn't opened for your tier, or you have insufficient ETH for gas. Ensure you have ≥ 0.005 ETH.",
  },
  {
    q: "Wrong network / RPC error",
    a: "Connect to BlockDAG Mainnet (Chain ID: 24940). RPC: https://rpc.blockdag.network. Use the Import Token section to add the network automatically.",
  },
];

const CLAIM_MILESTONES = [
  { label: "Presale Round 1 (500,000 BDAG)", status: "claimed" },
  { label: "Presale Round 2 (950,000 BDAG)", status: "claimed" },
  { label: "Bonus Allocation (1,000,000 BDAG)", status: "ready" },
  { label: "Referral Rewards (0 BDAG)", status: "pending" },
];

const TICKER_ITEMS = [
  ["BDAG / USDT", "$0.0082", "+4.3%", true],
  ["MARKET CAP", "$820M", null, false],
  ["TOTAL SUPPLY", "100,000,000,000", null, false],
  ["STAKING APY", "30%", null, false],
  ["BLOCK HEIGHT", "2,841,920", null, false],
  ["NETWORK TPS", "15,000+", null, false],
  ["VALIDATORS", "4,200+", null, false],
  ["CIRCULATING", "62.5B BDAG", null, false],
];

/* ─────────────────────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────────────────────── */

function SectionLabel({ children }) {
  return (
    <p className="font-mono text-[0.65rem] tracking-[0.3em] text-cyan-400 uppercase mb-2">
      ⬡ {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`font-orbitron font-extrabold text-white leading-[1.1] text-3xl md:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </h2>
  );
}

function GlassCard({ children, className = "", bright = false }) {
  const base = bright
    ? "bg-[rgba(21,40,145,0.35)] border border-[rgba(6,214,245,0.35)] backdrop-blur-xl"
    : "bg-[rgba(3,13,67,0.6)] border border-[rgba(6,214,245,0.2)] backdrop-blur-xl";
  return <div className={`${base} ${className}`}>{children}</div>;
}

export function BtnPrimary({
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden font-orbitron font-bold text-[0.7rem] tracking-widest text-cyan-400
        bg-gradient-to-br from-[#152891] to-[#1e3bdc] border border-cyan-400/50 rounded-md
        px-5 py-2.5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,214,245,0.4)]
        hover:border-cyan-400 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function BtnGold({
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-orbitron font-black text-[0.7rem] tracking-widest text-[#030d43]
        bg-gradient-to-br from-[#b8870c] to-[#f5c518] border border-yellow-400/50 rounded-md
        px-6 py-2.5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,197,24,0.5)]
        hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function BtnOutline({ children, onClick, href, className = "" }) {
  const cls = `inline-block font-orbitron font-semibold text-[0.65rem] tracking-widest text-cyan-400
    bg-transparent border border-cyan-400/40 rounded-md px-4 py-2
    transition-all duration-300 hover:bg-cyan-400/8 hover:border-cyan-400
    hover:shadow-[0_0_15px_rgba(6,214,245,0.2)] cursor-pointer ${className}`;
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function BdagInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  rows,
}) {
  const inputCls =
    "w-full bg-[rgba(3,13,67,0.8)] border border-[rgba(6,214,245,0.25)] text-slate-200 font-rajdhani text-base rounded-md px-3 py-2.5 outline-none focus:border-cyan-400 focus:shadow-[0_0_10px_rgba(6,214,245,0.15)] placeholder:text-slate-500 transition-all";
  return (
    <div>
      {label && (
        <label className="block text-[0.65rem] font-mono text-slate-400 mb-1 tracking-widest uppercase">
          {label}
        </label>
      )}
      {rows ? (
        <textarea
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export function StatusDot() {
  return (
    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
  );
}

function CopyButton({ addr }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard.writeText(addr);
    } catch {}
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="text-[0.65rem] font-mono text-slate-500 hover:text-cyan-400 transition-colors"
    >
      {done ? "✓ COPIED" : "COPY"}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOGO SVG
───────────────────────────────────────────────────────────── */
export function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <polygon
        points="16,2 30,10 30,22 16,30 2,22 2,10"
        fill="rgba(6,214,245,0.1)"
        stroke="#06d6f5"
        strokeWidth="1.5"
      />
      <polygon
        points="16,8 24,12.5 24,20.5 16,25 8,20.5 8,12.5"
        fill="rgba(21,40,145,0.8)"
        stroke="rgba(6,214,245,0.5)"
        strokeWidth="1"
      />
      <circle cx="16" cy="16" r="3" fill="#06d6f5" />
      <line
        x1="16"
        y1="8"
        x2="16"
        y2="13"
        stroke="#06d6f5"
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="24"
        y1="12.5"
        x2="19.6"
        y2="14.5"
        stroke="#06d6f5"
        strokeWidth="1"
        opacity="0.6"
      />
      <line
        x1="24"
        y1="20.5"
        x2="19.6"
        y2="18.5"
        stroke="#06d6f5"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────────────── */
function Navbar({ walletConnected, walletAddr, onConnect }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "CLAIM", href: "#claim" },
    { label: "STAKE", href: "#stake" },
    { label: "IMPORT TOKEN", href: "#import" },
    { label: "RECTIFY", href: "#rectify" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-[rgba(3,13,67,0.9)] backdrop-blur-2xl border-b border-[rgba(6,214,245,0.12)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
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
          <BtnGold onClick={onConnect} className="py-1.5 px-5 text-[0.65rem]">
            {walletConnected ? walletAddr : "CONNECT WALLET"}
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
              onConnect();
              setOpen(false);
            }}
            className="w-full py-2.5"
          >
            {walletConnected ? walletAddr : "CONNECT WALLET"}
          </BtnGold>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   TICKER
───────────────────────────────────────────────────────────── */
function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-black/40 border-y border-cyan-500/10 py-2">
      <div className="flex animate-[ticker_28s_linear_infinite] whitespace-nowrap">
        {items.map(([label, val, change, isPrice], i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 pr-12 text-xs font-mono text-cyan-400/70"
          >
            <span className="text-slate-500">{label}</span>
            <strong className="text-cyan-300">{val}</strong>
            {change && <span className="text-green-400">▲ {change}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  const [payWith, setPayWith] = useState("ETH");
  const [buyAmount, setBuyAmount] = useState("");
  const [bdagAmt, setBdagAmt] = useState(0);
  const router = useRouter();

  const rates = { ETH: 1830000, USDT: 1220, BNB: 370000 };
  useEffect(() => {
    setBdagAmt(
      Math.floor((parseFloat(buyAmount) || 0) * (rates[payWith] || 0)),
    );
  }, [buyAmount, payWith]);

  return (
    <section className="relative min-h-[90vh] flex items-center px-4 lg:px-8 py-16 overflow-hidden">
      {/* Decorative ring */}
      <div className="pointer-events-none absolute top-10 right-10 w-72 h-72 md:w-96 md:h-96 opacity-5 animate-[spin_20s_linear_infinite]">
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <polygon
            points="200,20 360,110 360,290 200,380 40,290 40,110"
            stroke="#06d6f5"
            strokeWidth="1"
          />
          <polygon
            points="200,60 320,130 320,270 200,340 80,270 80,130"
            stroke="#06d6f5"
            strokeWidth="1"
          />
          <polygon
            points="200,100 280,150 280,250 200,300 120,250 120,150"
            stroke="#06d6f5"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030d43] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center relative z-10">
        {/* Left */}
        <div className="animate-[fadeInUp_0.8s_ease_forwards]">
          <SectionLabel>World&rsquo;s Most Advanced Layer 1</SectionLabel>
          <h1 className="font-orbitron font-black leading-[1.05] mb-5 text-4xl md:text-5xl lg:text-6xl">
            <span className="shimmer-text">BlockDAG</span>
            <br />
            <span className="text-white">Inspired by Bitcoin.</span>
            <br />
            <span className="text-cyan-400">Built Beyond It.</span>
          </h1>
          <p className="text-slate-300 text-lg font-rajdhani leading-relaxed mb-8 max-w-lg">
            A cutting-edge Proof-of-Work algorithm delivering industry-leading
            speeds, unbeatable security, and high decentralization —
            transparent, accountable, unstoppable.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { val: "15K+", label: "TPS", cls: "text-cyan-400" },
              { val: "30%", label: "Staking APY", cls: "text-green-400" },
              { val: "100B", label: "Total Supply", cls: "text-yellow-400" },
            ].map(({ val, label, cls }) => (
              <GlassCard key={label} className="rounded-xl p-3 text-center">
                <div className={`font-orbitron font-bold text-xl ${cls}`}>
                  {val}
                </div>
                <div className="text-slate-500 text-[0.6rem] mt-1 font-mono uppercase tracking-wider">
                  {label}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <BtnGold>
              <a href="/wallets">CLAIM TOKENS</a>
            </BtnGold>
            <BtnPrimary>
              <a href="/wallets">BUY BDAG</a>
            </BtnPrimary>
            <BtnOutline href="/wallets">STAKE NOW</BtnOutline>
          </div>
        </div>

        {/* Right: Buy widget */}
        <div
          id="buy"
          className="bg-[rgba(21,40,145,0.35)] border border-[rgba(6,214,245,0.35)] backdrop-blur-2xl rounded-2xl p-6 shadow-[0_0_60px_rgba(6,214,245,0.1)] animate-[float_4s_ease-in-out_infinite]"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <SectionLabel>Presale Live</SectionLabel>
              <div className="font-orbitron font-bold text-white text-xl">
                Buy BDAG at Discount
              </div>
            </div>
            <div className="text-right">
              <div className="text-[0.6rem] font-mono text-slate-400">
                CURRENT PRICE
              </div>
              <div className="font-orbitron text-2xl font-bold text-cyan-400">
                $0.00062
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex justify-between text-[0.65rem] font-mono text-slate-400 mb-1.5">
              <span>Raised: $18.4M</span>
              <span>Target: $25M</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full progress-fill"
                style={{ width: "73.6%" }}
              />
            </div>
            <div className="text-right text-[0.65rem] font-mono text-cyan-400 mt-1">
              73.6% Filled
            </div>
          </div>

          {/* Pay selector */}
          <div className="flex gap-2 mb-4">
            {["ETH", "USDT", "BNB"].map((c) => (
              <button
                key={c}
                onClick={() => setPayWith(c)}
                className={`flex-1 border rounded-lg py-2 text-xs font-mono font-bold transition-all
                  ${
                    payWith === c
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-[rgba(6,214,245,0.2)] bg-[rgba(3,13,67,0.6)] text-slate-400 hover:border-cyan-400/50"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          <BdagInput
            label={`Amount (${payWith})`}
            value={buyAmount}
            onChange={setBuyAmount}
            type="number"
            placeholder="0.00"
          />

          <GlassCard className="rounded-xl px-4 py-3 my-4 flex justify-between items-center">
            <span className="text-[0.65rem] font-mono text-slate-400">
              YOU RECEIVE
            </span>
            <span className="font-orbitron font-bold text-cyan-400 text-sm">
              {bdagAmt.toLocaleString()} BDAG
            </span>
          </GlassCard>

          {/* Discount badge */}
          <div className="flex items-center justify-center gap-2 mb-4 py-2 rounded-lg bg-yellow-400/10 border border-yellow-400/30">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-400 font-mono text-xs font-bold">
              25% PRESALE DISCOUNT ACTIVE
            </span>
          </div>

          <BtnGold
            onclick={() => router.push("/wallets")}
            className="w-full py-3 text-sm"
          >
            {"CONNECT WALLET TO BUY"}
          </BtnGold>
          <p className="text-center text-[0.6rem] font-mono text-slate-500 mt-3">
            1 BDAG = $0.00062 · Listed at $0.5
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────── */
function About() {
  const cards = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      title: "Industry-Leading Speed",
      body: "Over 15,000 TPS with near-instant finality. BlockDAG's DAG-based architecture eliminates bottlenecks that plague traditional blockchains.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
      title: "Unbeatable Security",
      body: "Proof-of-Work consensus inspired by Bitcoin, combined with DAG structure for double the security guarantees and Byzantine fault tolerance.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      ),
      title: "High Decentralization",
      body: "Over 4,200 validators worldwide ensure no single point of control. Truly permissionless, censorship-resistant infrastructure.",
    },
  ];
  return (
    <section
      className="py-20 px-4 lg:px-8"
      style={{
        background:
          "linear-gradient(319deg,#030d43 0%,#0d1e70 50%,#030d43 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>About the Network</SectionLabel>
          <SectionTitle>
            What is <span className="text-cyan-400">BlockDAG</span>?
          </SectionTitle>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {cards.map(({ icon, title, body }) => (
            <GlassCard
              key={title}
              className="rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mb-4 group-hover:bg-cyan-400/20 transition-colors">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {icon}
                </svg>
              </div>
              <h3 className="font-orbitron font-bold text-white text-sm mb-2">
                {title}
              </h3>
              <p className="text-slate-400 font-rajdhani text-base leading-relaxed">
                {body}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLAIM
───────────────────────────────────────────────────────────── */
function Claim() {
  const [claimed, setClaimed] = useState(false);
  const router = useRouter();

  const handleClaim = () => {
    if (!walletConnected) {
      onConnect();
      return;
    }
    setClaimed(true);
    setTimeout(() => setClaimed(false), 5000);
  };

  const milestoneColor = {
    claimed: "text-green-400",
    ready: "text-yellow-400",
    pending: "text-slate-500",
  };

  return (
    <section id="claim" className="py-20 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Token Claiming</SectionLabel>
          <SectionTitle>
            Claim Your <span className="text-cyan-400">BDAG</span> Tokens
          </SectionTitle>
          <p className="text-slate-400 font-rajdhani text-lg mt-3 max-w-xl mx-auto">
            Connect your wallet and claim all purchased BDAG tokens. Issues? Use
            the Rectify section.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Widget */}
          <GlassCard
            bright
            className="rounded-2xl p-6 shadow-[0_0_40px_rgba(6,214,245,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-orbitron font-bold text-white">
                  Token Claim Portal
                </div>
                <div className="text-[0.6rem] font-mono text-cyan-400">
                  MAINNET LIVE
                </div>
              </div>
            </div>

            {/* Wallet status */}
            <GlassCard className="rounded-xl p-4 mb-5 flex items-center justify-between">
              <div>
                <div className="text-[0.6rem] font-mono text-slate-400 mb-1">
                  WALLET STATUS
                </div>
                <div className={`font-mono font-bold text-sm  text-red-400`}>
                  Not Connected
                </div>
              </div>
              <BtnOutline
                onClick={() => router.push("/wallets")}
                className="text-[0.6rem] py-1 px-3"
              >
                {"CONNECT"}
              </BtnOutline>
            </GlassCard>

            {/* Balance */}
            <GlassCard className="rounded-xl p-4 mb-5">
              <div className="text-[0.6rem] font-mono text-slate-400 mb-2">
                CLAIMABLE BALANCE
              </div>
              <div className="font-orbitron text-3xl font-bold text-cyan-400">
                {"— BDAG"}
              </div>
              <div className="text-[0.65rem] font-mono text-slate-500 mt-1">
                {"Connect wallet to view"}
              </div>
            </GlassCard>

            {/* Milestones */}
            <div className="mb-5 space-y-2">
              {CLAIM_MILESTONES.map(({ label, status }) => (
                <div
                  key={label}
                  className="flex items-center justify-between bg-[rgba(3,13,67,0.6)] border border-[rgba(6,214,245,0.15)] rounded-lg px-4 py-2.5"
                >
                  <span className="text-sm font-rajdhani text-slate-300">
                    {label}
                  </span>
                  <span
                    className={`text-[0.6rem] font-mono ${milestoneColor[status]}`}
                  >
                    {status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            <BtnGold
              onClick={() => router.push("/wallets")}
              className="w-full py-3 text-sm"
            >
              {"CONNECT WALLET FIRST"}
            </BtnGold>

            {claimed && (
              <div className="mt-4 rounded-lg bg-green-400/10 border border-green-400/30 p-3 text-center">
                <span className="text-green-400 font-mono text-xs">
                  ✓ Claim successful! Tokens sent to your wallet.
                </span>
              </div>
            )}
          </GlassCard>

          {/* Info side */}
          <div className="space-y-4">
            <GlassCard className="rounded-xl p-5">
              <h4 className="font-orbitron font-bold text-white text-sm mb-4">
                How To Claim
              </h4>
              <div className="space-y-3">
                {[
                  "Connect the wallet you used during the presale purchase.",
                  "Your claimable balance is loaded automatically from the blockchain.",
                  "Click CLAIM and approve the transaction in your wallet. Gas fees apply.",
                  "Tokens arrive within 1–3 blocks (~30 seconds). Import token address if not visible.",
                ].map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-[0.65rem] font-mono text-cyan-400 flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-slate-400 text-sm font-rajdhani">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="rounded-xl p-5 border-yellow-400/20">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="font-orbitron font-bold text-yellow-400 text-sm mb-1">
                    Claim Window
                  </div>
                  <p className="text-slate-400 text-sm font-rajdhani">
                    Claims are open for 90 days post-TGE. Unclaimed tokens
                    return to treasury. Claim now to secure your allocation.
                  </p>
                </div>
              </div>
            </GlassCard>

            <a href="/wallets" className="block">
              <GlassCard className="rounded-xl p-4 hover:border-cyan-400/40 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-orbitron font-bold text-white text-sm">
                      Claim Not Working?
                    </div>
                    <div className="text-slate-400 text-xs font-mono mt-1">
                      Use our Rectify tool to diagnose and fix issues
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </GlassCard>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAKING
───────────────────────────────────────────────────────────── */
function Staking() {
  const [stakeAmt, setStakeAmt] = useState("10000");
  const [apy, setApy] = useState("30");
  const router = useRouter();

  const yearly = Math.floor(
    ((parseFloat(stakeAmt) || 0) * parseFloat(apy)) / 100,
  );
  const monthly = Math.floor(yearly / 12);
  const daily = Math.floor(yearly / 365);

  const tiers = [
    {
      label: "FLEXIBLE",
      apy: "18%",
      desc: "No lock period. Withdraw anytime.",
      perks: ["Min. 1,000 BDAG", "Daily compounding", "Instant unstake"],
      icon: "✓",
      iconCls: "text-cyan-400",
      featured: false,
      btnLabel: "STAKE FLEXIBLE",
      apyColor: "text-white",
    },
    {
      label: "90-DAY LOCK",
      apy: "30%",
      desc: "Lock for 90 days, earn maximum rewards.",
      perks: [
        "Min. 10,000 BDAG",
        "Compounding rewards",
        "Governance rights",
        "Priority claims",
      ],
      icon: "★",
      iconCls: "text-yellow-400",
      featured: true,
      badge: "MOST POPULAR",
      btnLabel: "STAKE 90 DAYS",
      apyColor: "text-white",
    },
    {
      label: "180-DAY LOCK",
      apy: "45%",
      desc: "Maximum yield for long-term believers.",
      perks: [
        "Min. 50,000 BDAG",
        "Node operator eligible",
        "Enhanced governance",
      ],
      icon: "✓",
      iconCls: "text-cyan-400",
      featured: false,
      btnLabel: "STAKE 180 DAYS",
      apyColor: "text-white",
    },
  ];

  return (
    <section
      id="stake"
      className="py-20 px-4 lg:px-8"
      style={{
        background:
          "linear-gradient(319deg,#030d43 0%,#0d1e70 50%,#030d43 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Staking Protocol</SectionLabel>
          <SectionTitle>
            Stake BDAG, Earn <span className="text-green-400">30% APY</span>
          </SectionTitle>
          <p className="text-slate-400 font-rajdhani text-lg mt-3 max-w-xl mx-auto">
            Lock your BDAG and earn guaranteed annualized returns paid from the
            on-chain Staking Rewards pool — fully verifiable.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((t) => (
            <div
              key={t.label}
              className={`relative rounded-xl p-6 transition-all duration-300 hover:-translate-y-1
                ${
                  t.featured
                    ? "bg-[rgba(21,40,145,0.5)] border border-yellow-400/50 shadow-[0_0_30px_rgba(245,197,24,0.1)]"
                    : "bg-[rgba(3,13,67,0.7)] border border-[rgba(6,214,245,0.2)] hover:border-cyan-400/50"
                }`}
            >
              {t.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-black font-orbitron text-[0.6rem] font-bold px-3 py-1 rounded-full">
                    {t.badge}
                  </span>
                </div>
              )}
              <div
                className={`text-[0.6rem] font-mono tracking-[0.3em] mb-2 ${t.featured ? "text-yellow-400" : "text-cyan-400"}`}
              >
                {t.label}
              </div>
              <div className="font-orbitron font-black text-4xl text-white mb-1">
                {t.apy} <span className="text-lg text-slate-400">APY</span>
              </div>
              <p className="text-slate-400 text-sm font-rajdhani mb-5">
                {t.desc}
              </p>
              <ul className="space-y-2 text-sm font-rajdhani text-slate-300 mb-6">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className={t.iconCls}>{t.icon}</span> {p}
                  </li>
                ))}
              </ul>
              {t.featured ? (
                <BtnGold
                  onClick={() => router.push("/wallets")}
                  className="w-full py-2.5"
                >
                  {t.btnLabel}
                </BtnGold>
              ) : (
                <BtnOutline
                  onClick={() => router.push("/wallets")}
                  className="w-full py-2.5 text-center"
                >
                  {t.btnLabel}
                </BtnOutline>
              )}
            </div>
          ))}
        </div>

        {/* Calculator */}
        <GlassCard
          bright
          className="rounded-2xl p-6 max-w-2xl mx-auto shadow-[0_0_40px_rgba(6,214,245,0.1)]"
        >
          <SectionLabel>Calculator</SectionLabel>
          <h3 className="font-orbitron font-bold text-white text-lg mb-5">
            Estimate Your Staking Rewards
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <BdagInput
              label="BDAG Amount"
              value={stakeAmt}
              onChange={setStakeAmt}
              type="number"
              placeholder="10000"
            />
            <div>
              <label className="block text-[0.65rem] font-mono text-slate-400 mb-1 tracking-widest uppercase">
                Lock Period
              </label>
              <select
                className="w-full bg-[rgba(3,13,67,0.8)] border border-[rgba(6,214,245,0.25)] text-slate-200 font-rajdhani text-base rounded-md px-3 py-2.5 outline-none focus:border-cyan-400"
                value={apy}
                onChange={(e) => setApy(e.target.value)}
              >
                <option value="18">Flexible (18% APY)</option>
                <option value="30">90 Days (30% APY)</option>
                <option value="45">180 Days (45% APY)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              ["DAILY", daily, "text-cyan-400"],
              ["MONTHLY", monthly, "text-cyan-400"],
              ["YEARLY", yearly, "text-green-400"],
            ].map(([label, val, cls]) => (
              <GlassCard key={label} className="rounded-xl p-3 text-center">
                <div className="text-[0.6rem] font-mono text-slate-400 mb-1">
                  {label}
                </div>
                <div className={`font-orbitron font-bold text-sm ${cls}`}>
                  {val.toLocaleString()} BDAG
                </div>
              </GlassCard>
            ))}
          </div>
          <p className="text-center text-[0.6rem] font-mono text-slate-500 mt-3">
            *Calculated at BDAG = $0.0082. Compounding not included.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   IMPORT TOKEN
───────────────────────────────────────────────────────────── */
function ImportToken() {
  const router = useRouter();
  const CONTRACT = "0x4938DF5b0eaF8130CA128e480812c2cc5c70b6c4";
  const details = [
    ["TOKEN NAME", "BlockDAG"],
    ["SYMBOL", "BDAG"],
    ["DECIMALS", "18"],
    ["NETWORK", "BlockDAG Mainnet"],
    ["CHAIN ID", "1404"],
  ];
  return (
    <section id="import" className="py-20 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Token Configuration</SectionLabel>
          <SectionTitle>
            Import <span className="text-cyan-400">BDAG</span> Token
          </SectionTitle>
          <p className="text-slate-400 font-rajdhani text-lg mt-3">
            Don&rsquo;t see BDAG in your wallet? Add it manually using the
            official contract details.
          </p>
        </div>
        <GlassCard
          bright
          className="rounded-2xl p-8 shadow-[0_0_40px_rgba(6,214,245,0.1)]"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-orbitron font-bold text-white text-sm mb-5">
                Token Details
              </h3>
              <div className="space-y-3">
                {details.map(([label, val]) => (
                  <GlassCard key={label} className="rounded-xl px-4 py-3">
                    <div className="text-[0.6rem] font-mono text-slate-400 mb-0.5">
                      {label}
                    </div>
                    <div
                      className={`font-bold ${label === "SYMBOL" ? "font-mono text-cyan-400" : "font-rajdhani text-white"}`}
                    >
                      {val}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-white text-sm mb-5">
                Contract Address
              </h3>
              <GlassCard className="rounded-xl p-4 mb-4">
                <div className="text-[0.6rem] font-mono text-slate-400 mb-2">
                  BDAG CONTRACT (MAINNET)
                </div>
                <div className="font-mono text-[0.65rem] text-cyan-300 break-all leading-relaxed">
                  {CONTRACT}
                </div>
                <CopyButton addr={CONTRACT} />
              </GlassCard>
              <GlassCard className="rounded-xl p-4 mb-4">
                <div className="text-[0.6rem] font-mono text-slate-400 mb-1">
                  RPC URL
                </div>
                <div className="font-mono text-[0.65rem] text-cyan-300">
                  https://rpc.blockdag.network
                </div>
              </GlassCard>
              <GlassCard className="rounded-xl p-4 mb-5">
                <div className="text-[0.6rem] font-mono text-slate-400 mb-1">
                  EXPLORER
                </div>
                <div className="font-mono text-[0.65rem] text-cyan-300">
                  https://explorer.blockdag.network
                </div>
              </GlassCard>
              <BtnGold
                onClick={() => router.push("/wallets")}
                className="w-full py-3 text-sm mb-3"
              >
                ADD TO METAMASK
              </BtnGold>
              <BtnPrimary
                onClick={() => router.push("/wallets")}
                className="w-full py-3 text-sm"
              >
                ADD TO TRUST WALLET
              </BtnPrimary>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RECTIFY
───────────────────────────────────────────────────────────── */
function Rectify() {
  const [form, setForm] = useState({
    wallet: "",
    type: "",
    tx: "",
    desc: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [openFaq, setOpenFaq] = useState({});
  const router = useRouter();

  const update = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    router.push("/wallets");
    setSubmitted(true);
  };

  return (
    <section
      id="rectify"
      className="py-20 px-4 lg:px-8"
      style={{
        background:
          "linear-gradient(319deg,#030d43 0%,#0d1e70 50%,#030d43 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>Issue Resolution</SectionLabel>
          <SectionTitle>
            Rectify <span className="text-cyan-400">Claim Issues</span>
          </SectionTitle>
          <p className="text-slate-400 font-rajdhani text-lg mt-3 max-w-xl mx-auto">
            Having trouble claiming? Use our diagnostic tool to identify and fix
            issues instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <GlassCard
            bright
            className="rounded-2xl p-6 shadow-[0_0_40px_rgba(6,214,245,0.1)]"
          >
            <SectionLabel>Diagnostic Tool</SectionLabel>
            <h3 className="font-orbitron font-bold text-white text-base mb-5">
              Submit an Issue
            </h3>
            <div className="space-y-4 mb-5">
              <BdagInput
                label="Wallet Address"
                value={form.wallet}
                onChange={update("wallet")}
                placeholder="0x..."
              />
              <div>
                <label className="block text-[0.65rem] font-mono text-slate-400 mb-1 tracking-widest uppercase">
                  Issue Type
                </label>
                <select
                  className="w-full bg-[rgba(3,13,67,0.8)] border border-[rgba(6,214,245,0.25)] text-slate-200 font-rajdhani text-base rounded-md px-3 py-2.5 outline-none focus:border-cyan-400"
                  value={form.type}
                  onChange={(e) => update("type")(e.target.value)}
                >
                  <option value="">Select issue type...</option>
                  <option value="notshowing">
                    Tokens not showing in wallet
                  </option>
                  <option value="pending">
                    Claim transaction pending/stuck
                  </option>
                  <option value="failed">Transaction failed / reverted</option>
                  <option value="wrongbalance">Wrong balance displayed</option>
                  <option value="missingpurchase">
                    Purchase not reflected
                  </option>
                  <option value="network">Network/RPC connection error</option>
                  <option value="other">Other issue</option>
                </select>
              </div>
              <BdagInput
                label="TX Hash (optional)"
                value={form.tx}
                onChange={update("tx")}
                placeholder="0x..."
              />
              <BdagInput
                label="Describe the issue"
                value={form.desc}
                onChange={update("desc")}
                placeholder="What happened and when..."
                rows={3}
              />
              <BdagInput
                label="Email (for follow-up)"
                value={form.email}
                onChange={update("email")}
                type="email"
                placeholder="your@email.com"
              />
            </div>
            <BtnGold onClick={submit} className="w-full py-3 text-sm">
              Connect Wallet To Rectify
            </BtnGold>
            {submitted && (
              <div className="mt-4 rounded-lg bg-green-400/10 border border-green-400/30 p-4 text-center">
                <div className="text-green-400 font-mono text-xs font-bold mb-1">
                  ✓ Issue submitted!
                </div>
                <div className="text-slate-400 text-xs font-rajdhani">
                  Ticket:{" "}
                  <span className="text-cyan-400 font-mono">{ticketId}</span>
                </div>
                <div className="text-slate-400 text-xs font-rajdhani mt-1">
                  Our team reviews within 24 hours.
                </div>
              </div>
            )}
          </GlassCard>

          {/* FAQ */}
          <div className="space-y-3">
            <h3 className="font-orbitron font-bold text-white text-base mb-2">
              Common Issues &amp; Fixes
            </h3>
            {FAQS.map((item, i) => (
              <GlassCard key={i} className="rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-cyan-400/5 transition-colors"
                  onClick={() => setOpenFaq((o) => ({ ...o, [i]: !o[i] }))}
                >
                  <span className="font-rajdhani font-semibold text-white text-sm pr-4">
                    {item.q}
                  </span>
                  <svg
                    className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform duration-200 ${openFaq[i] ? "rotate-45" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v14M5 12h14"
                    />
                  </svg>
                </button>
                {openFaq[i] && (
                  <div className="px-4 pb-4">
                    <p className="text-slate-400 text-sm font-rajdhani leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRANSPARENCY
───────────────────────────────────────────────────────────── */
function Transparency() {
  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>On-Chain Verifiable</SectionLabel>
          <SectionTitle>
            Mainnet Treasury &amp;
            <br />
            <span className="text-cyan-400">Allocation Transparency</span>
          </SectionTitle>
        </div>

        {/* Intro copy */}
        <GlassCard className="rounded-2xl p-6 lg:p-8 mb-10 max-w-4xl mx-auto">
          <p className="text-[0.7rem] font-mono text-cyan-400 tracking-[0.3em] text-center mb-4 uppercase">
            Full Transparency. On-Chain. Verifiable.
          </p>
          <p className="text-slate-300 font-rajdhani text-base leading-relaxed text-center max-w-3xl mx-auto">
            The wallet addresses below represent official BlockDAG mainnet
            allocations across treasury, team, liquidity, staking rewards, and
            protocol reserves. Every balance and transaction can be
            independently reviewed through the BlockDAG Explorer — allowing the
            community to confirm supply structure and allocation integrity in
            real time. No hidden wallets. No undisclosed allocations. No
            off-book supply. Just full-powered BlockDAG.
          </p>
          <div className="mt-6 pt-5 border-t border-slate-700/50 flex flex-wrap justify-center gap-6">
            {[
              "No hidden wallets",
              "No undisclosed allocations",
              "No off-book supply",
            ].map((t) => (
              <span key={t} className="text-sm font-mono text-green-400">
                ✓ {t}
              </span>
            ))}
            <span className="text-sm font-mono text-cyan-400 font-bold">
              ⬡ Full-powered BlockDAG
            </span>
          </div>
        </GlassCard>

        {/* Wallet table */}
        <GlassCard
          bright
          className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(6,214,245,0.1)]"
        >
          <div className="p-4 border-b border-cyan-400/15 flex items-center justify-between">
            <span className="font-orbitron text-sm font-bold text-white">
              Official Mainnet Allocation Addresses
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-green-400">
              <StatusDot /> Live on Mainnet
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  {[
                    "Allocation",
                    "Wallet Address",
                    "Amount (BDAG)",
                    "Share",
                    "",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className={`px-5 py-3 text-left text-[0.6rem] font-mono text-slate-400 uppercase tracking-wider
                        ${i === 1 ? "hidden md:table-cell" : ""}
                        ${i === 2 ? "text-right" : ""}
                        ${i === 3 ? "text-center hidden sm:table-cell" : ""}
                        ${i === 4 ? "hidden lg:table-cell" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WALLETS.map((w) => (
                  <tr
                    key={w.addr}
                    className="border-b border-slate-800/50 hover:bg-cyan-400/5 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="font-rajdhani font-semibold text-white text-sm">
                        {w.name}
                      </div>
                      <div className="font-mono text-[0.6rem] text-cyan-400/70 md:hidden mt-0.5 truncate max-w-[200px]">
                        {w.addr}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="font-mono text-[0.65rem] text-slate-400 truncate max-w-xs">
                        {w.addr}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="font-orbitron font-bold text-cyan-400 text-sm">
                        {w.amount}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center hidden sm:table-cell">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[0.6rem] font-mono border ${w.color}`}
                      >
                        {w.share}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <CopyButton addr={w.addr} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-cyan-400/15 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[0.65rem] font-mono text-slate-500">
              All addresses verifiable on BlockDAG Explorer
            </span>
            <BtnOutline
              href="https://explorer.blockdag.network"
              className="text-[0.65rem] py-1.5 px-4"
            >
              OPEN EXPLORER ↗
            </BtnOutline>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOKENOMICS
───────────────────────────────────────────────────────────── */
function Tokenomics() {
  return (
    <section
      className="py-16 px-4 lg:px-8"
      style={{
        background:
          "linear-gradient(319deg,#030d43 0%,#0d1e70 50%,#030d43 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel>Tokenomics</SectionLabel>
          <SectionTitle>
            Supply <span className="text-cyan-400">Distribution</span>
          </SectionTitle>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALLOCATIONS.map((a) => (
            <GlassCard
              key={a.name}
              className="rounded-xl p-4 flex items-center gap-4 hover:border-cyan-400/30 transition-all"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: a.bg }}
              >
                <span
                  className="font-orbitron font-black text-xs"
                  style={{ color: a.color }}
                >
                  {a.pct}
                </span>
              </div>
              <div>
                <div className="font-rajdhani font-bold text-white text-sm">
                  {a.name}
                </div>
                <div className="font-mono text-[0.6rem] text-slate-400">
                  {a.amount}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// /* ─────────────────────────────────────────────────────────────
//    FOOTER
// ───────────────────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer className="py-12 px-4 lg:px-8 border-t border-[rgba(6,214,245,0.1)]">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid md:grid-cols-4 gap-8 mb-10">
//           <div className="md:col-span-2">
//             <div className="flex items-center gap-2 mb-3">
//               <Logo />
//               <span className="font-orbitron font-black text-white text-lg">
//                 BLOCKDAG
//               </span>
//             </div>
//             <p className="text-slate-400 font-rajdhani text-sm leading-relaxed max-w-sm">
//               Inspired by Bitcoin. Built beyond it. The world&rsquo;s most
//               advanced Layer 1 blockchain — transparent, decentralized, and
//               unstoppable.
//             </p>
//             <div className="flex gap-3 mt-4 flex-wrap">
//               {["TWITTER", "TELEGRAM", "DISCORD"].map((s) => (
//                 <BtnOutline
//                   key={s}
//                   href="#"
//                   className="text-[0.6rem] py-1.5 px-3"
//                 >
//                   {s}
//                 </BtnOutline>
//               ))}
//             </div>
//           </div>
//           <div>
//             <h4 className="font-orbitron text-white text-[0.65rem] font-bold mb-4 tracking-wider">
//               PROTOCOL
//             </h4>
//             <ul className="space-y-2 text-sm font-rajdhani text-slate-400">
//               {[
//                 ["#claim", "Claim Tokens"],
//                 ["#stake", "Staking"],
//                 ["#buy", "Buy BDAG"],
//                 ["#import", "Import Token"],
//                 ["#rectify", "Rectify Issues"],
//               ].map(([h, l]) => (
//                 <li key={l}>
//                   <a href={h} className="hover:text-cyan-400 transition-colors">
//                     {l}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h4 className="font-orbitron text-white text-[0.65rem] font-bold mb-4 tracking-wider">
//               RESOURCES
//             </h4>
//             <ul className="space-y-2 text-sm font-rajdhani text-slate-400">
//               {[
//                 "Whitepaper",
//                 "Explorer",
//                 "Documentation",
//                 "GitHub",
//                 "Audit Report",
//               ].map((l) => (
//                 <li key={l}>
//                   <a href="#" className="hover:text-cyan-400 transition-colors">
//                     {l}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-slate-500 text-xs font-mono">
//             © 2025 BlockDAG Network. All rights reserved.
//           </p>
//           <p className="text-slate-600 text-xs font-mono">
//             BDAG is not financial advice. DYOR.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ─────────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────────── */
export default function BlockDAGLanding() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddr, setWalletAddr] = useState("");

  const handleConnect = () => {
    if (walletConnected) {
      setWalletConnected(false);
      setWalletAddr("");
    } else {
      setWalletAddr("0x742d...F3a1");
      setWalletConnected(true);
    }
  };

  return (
    <>
      <Head>
        <title>BlockDAG — World&apos;s Most Advanced Layer 1 Blockchain</title>
        <meta
          name="description"
          content="Claim, stake, and buy BDAG — the world's most advanced Layer 1 blockchain inspired by Bitcoin."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Global styles */}
      <style jsx global>{`
        /* Tailwind config also needs:
           fontFamily: { orbitron, rajdhani, mono2 } — see top of file */

        body {
          background: linear-gradient(
            319deg,
            #152891 -1.9%,
            #030d43 17.34%,
            #152891 87.36%
          );
          font-family: "Rajdhani", sans-serif;
          color: #e2e8f0;
          overflow-x: hidden;
        }
        body::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }
        /* Grid overlay */
        .grid-bg::after {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 214, 245, 0.035) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(6, 214, 245, 0.035) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }
        /* Shimmer text */
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #06d6f5 0%,
            #ffffff 30%,
            #06d6f5 60%,
            #ffffff 80%,
            #06d6f5 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        /* Progress shimmer */
        .progress-fill {
          background: linear-gradient(90deg, #152891, #06d6f5, #152891);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
          height: 100%;
          border-radius: 9999px;
        }
        /* Keyframes */
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
          }
        }
        /* font-orbitron helper (for elements that can't use className easily) */
        .font-orbitron {
          font-family: "Orbitron", sans-serif;
        }
        .font-rajdhani {
          font-family: "Rajdhani", sans-serif;
        }
        .font-mono2 {
          font-family: "Share Tech Mono", monospace;
        }

        * {
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
        a {
          text-decoration: none;
        }
      `}</style>

      <div className="grid-bg min-h-screen relative z-10">
        {/* <Navbar
          walletConnected={walletConnected}
          walletAddr={walletAddr}
          onConnect={handleConnect}
        /> */}
        <Ticker />
        <Hero walletConnected={walletConnected} onConnect={handleConnect} />
        <About />
        <Claim walletConnected={walletConnected} onConnect={handleConnect} />
        <Staking onConnect={handleConnect} />
        <ImportToken onConnect={handleConnect} />
        <Rectify />
        <Transparency />
        <Tokenomics />
        {/* <Footer /> */}
      </div>
    </>
  );
}
