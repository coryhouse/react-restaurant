/* cSpell:ignore Fsvg, Crect, Csvg  */
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/design-proposals-frontend-plugin")({
  component: DesignProposals,
});

const menuItems = [
  {
    name: "Burger",
    price: 8.99,
    image: "/images/burger.jpg",
    tag: "Signature",
  },
  {
    name: "Cajun Pasta",
    price: 16.99,
    image: "/images/cajun-pasta.jpg",
    tag: "Spicy",
  },
  {
    name: "Salmon Steak",
    price: 18.99,
    image: "/images/salmon.jpg",
    tag: "Chef's Pick",
  },
  {
    name: "Street Tacos",
    price: 9.99,
    image: "/images/street-tacos.jpg",
    tag: "Popular",
  },
];

function DesignProposals() {
  const [expandedProposal, setExpandedProposal] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            className="text-2xl tracking-[-0.03em]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            React Bistro — Design Catalog
          </h1>
          <span className="text-sm text-white/50 font-mono">6 Proposals</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 bg-linear-to-br from-amber-900/20 via-transparent to-rose-900/20" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">
            Homepage Redesign
          </p>
          <h2
            className="text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Six Distinct
            <br />
            <span className="italic text-amber-200">Visions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Each proposal offers a complete aesthetic direction—from brutalist
            rawness to refined luxury. Click any card to explore the full
            vision.
          </p>
        </div>
      </section>

      {/* Proposals Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Proposal 1: Brutalist */}
          <ProposalCard
            index={1}
            title="Brutalist Kitchen"
            subtitle="Raw. Honest. Unforgettable."
            expanded={expandedProposal === 1}
            onToggle={() =>
              setExpandedProposal(expandedProposal === 1 ? null : 1)
            }
            tags={["Bold Typography", "High Contrast", "Grid Breaking"]}
            gradient="from-zinc-800 to-neutral-900"
          >
            <BrutalistProposal />
          </ProposalCard>

          {/* Proposal 2: Luxury */}
          <ProposalCard
            index={2}
            title="Golden Hour"
            subtitle="Refined elegance for discerning palates."
            expanded={expandedProposal === 2}
            onToggle={() =>
              setExpandedProposal(expandedProposal === 2 ? null : 2)
            }
            tags={["Serif Typography", "Gold Accents", "Sophisticated"]}
            gradient="from-amber-950 to-stone-900"
          >
            <LuxuryProposal />
          </ProposalCard>

          {/* Proposal 3: Organic */}
          <ProposalCard
            index={3}
            title="Farm to Table"
            subtitle="Warm, natural, and inviting."
            expanded={expandedProposal === 3}
            onToggle={() =>
              setExpandedProposal(expandedProposal === 3 ? null : 3)
            }
            tags={["Earth Tones", "Organic Shapes", "Handcrafted Feel"]}
            gradient="from-emerald-950 to-stone-900"
          >
            <OrganicProposal />
          </ProposalCard>

          {/* Proposal 4: Retro-Futuristic */}
          <ProposalCard
            index={4}
            title="Neon Diner"
            subtitle="70s nostalgia meets digital future."
            expanded={expandedProposal === 4}
            onToggle={() =>
              setExpandedProposal(expandedProposal === 4 ? null : 4)
            }
            tags={["Gradient Mesh", "Retro Typography", "Bold Geometry"]}
            gradient="from-fuchsia-950 to-violet-950"
          >
            <RetroFuturisticProposal />
          </ProposalCard>

          {/* Proposal 5: Editorial */}
          <ProposalCard
            index={5}
            title="The Menu Edit"
            subtitle="Magazine-worthy presentation."
            expanded={expandedProposal === 5}
            onToggle={() =>
              setExpandedProposal(expandedProposal === 5 ? null : 5)
            }
            tags={["Strong Grid", "Typography First", "Minimal"]}
            gradient="from-slate-800 to-slate-900"
          >
            <EditorialProposal />
          </ProposalCard>

          {/* Proposal 6: Playful */}
          <ProposalCard
            index={6}
            title="Pop Kitchen"
            subtitle="Bold, fun, and full of energy."
            expanded={expandedProposal === 6}
            onToggle={() =>
              setExpandedProposal(expandedProposal === 6 ? null : 6)
            }
            tags={["Vibrant Colors", "Playful Motion", "Energetic"]}
            gradient="from-orange-600 to-rose-700"
          >
            <PlayfulProposal />
          </ProposalCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            Click any proposal to see the expanded vision • All designs are
            production-ready
          </p>
        </div>
      </footer>
    </div>
  );
}

function ProposalCard({
  index,
  title,
  subtitle,
  expanded,
  onToggle,
  tags,
  gradient,
  children,
}: {
  index: number;
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  tags: string[];
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
        expanded ? "lg:col-span-2" : ""
      }`}
    >
      {/* Card Header - Always Visible */}
      <button
        type="button"
        className={`bg-linear-to-br ${gradient} p-6 cursor-pointer w-full text-left`}
        onClick={onToggle}
      >
        <div className="flex items-start justify-between mb-4">
          <span className="font-mono text-white/40 text-sm">0{index}</span>
          <span
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-hidden="true"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-45" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
        </div>

        <h3
          className="text-2xl md:text-3xl tracking-[-0.02em] mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {title}
        </h3>
        <p className="text-white/60 mb-4">{subtitle}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-mono bg-white/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </button>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? "max-h-500 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10">{children}</div>
      </div>
    </div>
  );
}

/* ============================================
   PROPOSAL 1: BRUTALIST
   ============================================ */
function BrutalistProposal() {
  return (
    <div className="bg-white text-black overflow-hidden">
      {/* Brutalist Nav */}
      <nav className="border-b-4 border-black p-4 flex justify-between items-center">
        <span
          className="text-3xl font-black tracking-[-0.05em] uppercase"
          style={{ fontFamily: "'Anton', Impact, sans-serif" }}
        >
          REACT BISTRO
        </span>
        <div className="flex gap-4 font-mono text-sm uppercase tracking-wider">
          <span className="hover:line-through cursor-pointer">Menu</span>
          <span className="hover:line-through cursor-pointer">About</span>
          <span className="hover:line-through cursor-pointer">Cart [0]</span>
        </div>
      </nav>

      {/* Hero - Brutalist Style */}
      <div className="relative bg-black text-white p-8 md:p-12">
        <div className="absolute top-4 right-4 text-[8rem] md:text-[12rem] font-black opacity-10 leading-none">
          EAT
        </div>
        <h1
          className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-[-0.04em] max-w-2xl"
          style={{ fontFamily: "'Anton', Impact, sans-serif" }}
        >
          FOOD
          <br />
          THAT
          <br />
          <span className="text-yellow-400">SPEAKS</span>
        </h1>
        <div className="mt-8 flex gap-4">
          <button
            type="button"
            className="bg-yellow-400 text-black px-8 py-4 font-black uppercase hover:bg-white transition-colors"
          >
            View Menu
          </button>
          <button
            type="button"
            className="border-2 border-white px-8 py-4 font-black uppercase hover:bg-white hover:text-black transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Menu Grid - Brutalist */}
      <div className="grid grid-cols-2 border-t-4 border-black">
        {menuItems.map((item, i) => (
          <div
            key={item.name}
            className={`relative border-b-4 border-black ${i % 2 === 0 ? "border-r-4" : ""} group cursor-pointer`}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/80 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="text-yellow-400 text-2xl font-black uppercase"
                style={{ fontFamily: "'Anton', Impact, sans-serif" }}
              >
                {item.name}
              </span>
              <span className="text-white font-mono">${item.price}</span>
            </div>
            <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 font-mono text-xs">
              {item.tag}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="bg-yellow-400 text-black p-4 text-center">
        <span
          className="text-xl font-black uppercase tracking-[0.2em]"
          style={{ fontFamily: "'Anton', Impact, sans-serif" }}
        >
          NO RESERVATIONS • FIRST COME FIRST SERVED • EST. 2024
        </span>
      </div>
    </div>
  );
}

/* ============================================
   PROPOSAL 2: LUXURY
   ============================================ */
function LuxuryProposal() {
  return (
    <div
      className="bg-[#1a1814] text-[#f5f0e8] overflow-hidden"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* Luxury Nav */}
      <nav className="border-b border-amber-200/20 px-8 py-6 flex justify-between items-center">
        <span className="text-2xl tracking-[0.2em] uppercase text-amber-200">
          React Bistro
        </span>
        <div className="flex gap-8 text-sm tracking-[0.15em] uppercase text-amber-100/60">
          <span className="hover:text-amber-200 cursor-pointer transition-colors">
            Carte
          </span>
          <span className="hover:text-amber-200 cursor-pointer transition-colors">
            Reservations
          </span>
          <span className="hover:text-amber-200 cursor-pointer transition-colors">
            Contact
          </span>
        </div>
      </nav>

      {/* Hero - Luxury */}
      <div className="relative py-20 px-8 text-center">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <svg viewBox="0 0 100 100" className="w-96 h-96" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#d4a853"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#d4a853"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="#d4a853"
              strokeWidth="0.5"
            />
          </svg>
        </div>
        <p className="text-amber-400 text-sm tracking-[0.3em] uppercase mb-4">
          A Culinary Experience
        </p>
        <h1 className="text-5xl md:text-7xl italic leading-tight mb-6">
          Where Every Dish
          <br />
          <span className="text-amber-200">Tells a Story</span>
        </h1>
        <p className="text-amber-100/50 max-w-xl mx-auto text-lg leading-relaxed mb-8">
          Indulge in an exquisite journey through flavors crafted with passion,
          presented with artistry, and served with grace.
        </p>
        <button
          type="button"
          className="border border-amber-400 text-amber-400 px-12 py-4 tracking-[0.2em] uppercase text-sm hover:bg-amber-400 hover:text-black transition-all duration-300"
        >
          Reserve a Table
        </button>
      </div>

      {/* Menu - Luxury Style */}
      <div className="px-8 pb-16">
        <div className="border-t border-amber-200/20 pt-8">
          <h2 className="text-center text-sm tracking-[0.3em] uppercase text-amber-400 mb-12">
            — Signature Selections —
          </h2>
          <div className="grid grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
            {menuItems.map((item) => (
              <div key={item.name} className="flex gap-6 group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-200/30 shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 border-b border-amber-200/10 pb-4">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl italic group-hover:text-amber-200 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-amber-400 font-light">
                      ${item.price}
                    </span>
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-100/40">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gold Banner */}
      <div className="bg-linear-to-r from-amber-900/50 via-amber-800/50 to-amber-900/50 py-6 text-center">
        <span className="text-amber-200 tracking-[0.2em] uppercase text-sm">
          ✦ Open Tuesday through Sunday • 5pm to 11pm ✦
        </span>
      </div>
    </div>
  );
}

/* ============================================
   PROPOSAL 3: ORGANIC / NATURAL
   ============================================ */
function OrganicProposal() {
  return (
    <div className="bg-[#faf7f2] text-[#2d2a26] overflow-hidden">
      {/* Organic Nav */}
      <nav className="px-6 py-5 flex justify-between items-center">
        <span
          className="text-2xl text-emerald-800"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          react bistro
        </span>
        <div className="flex gap-6 text-sm text-stone-600">
          <span className="hover:text-emerald-700 cursor-pointer transition-colors">
            menu
          </span>
          <span className="hover:text-emerald-700 cursor-pointer transition-colors">
            our story
          </span>
          <span className="hover:text-emerald-700 cursor-pointer transition-colors">
            visit
          </span>
        </div>
      </nav>

      {/* Hero - Organic */}
      <div className="relative px-6 py-16">
        {/* Organic shape decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill="#059669"
              d="M47.5,-57.2C59.9,-45.8,67.3,-29.3,69.8,-12.1C72.3,5.1,69.9,23,61.2,37.1C52.5,51.2,37.5,61.5,21.1,66.6C4.6,71.7,-13.3,71.5,-29.2,65.4C-45.1,59.3,-59,47.2,-66.3,32.1C-73.6,17,-74.3,-1.2,-69.4,-17.7C-64.5,-34.2,-54,-49,-40.5,-60C-27,-71,-10.5,-78.2,3.8,-82.7C18.1,-87.2,35.1,-68.6,47.5,-57.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="relative max-w-2xl">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs mb-6">
            locally sourced • seasonally inspired
          </span>
          <h1
            className="text-4xl md:text-6xl leading-tight mb-6 text-stone-800"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Nourishing food,
            <br />
            <span className="italic text-emerald-700">grown with care</span>
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed mb-8 max-w-lg">
            From our partner farms to your plate—every ingredient tells the
            story of sustainable farming and mindful cooking.
          </p>
          <button
            type="button"
            className="bg-emerald-700 text-white px-8 py-4 rounded-full hover:bg-emerald-800 transition-colors"
          >
            Explore our menu →
          </button>
        </div>
      </div>

      {/* Menu Cards - Organic */}
      <div className="px-6 pb-16">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {["All", "Breakfast", "Lunch", "Dinner", "Drinks"].map((cat, i) => (
            <button
              type="button"
              key={cat}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                i === 0
                  ? "bg-emerald-700 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="aspect-4/3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3
                    className="text-lg text-stone-800"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {item.name}
                  </h3>
                  <span className="text-emerald-700 font-medium">
                    ${item.price}
                  </span>
                </div>
                <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Organic */}
      <div className="bg-emerald-800 text-white/90 py-8 px-6 text-center">
        <p style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
          🌱 10% of proceeds support local regenerative farms
        </p>
      </div>
    </div>
  );
}

/* ============================================
   PROPOSAL 4: RETRO-FUTURISTIC
   ============================================ */
function RetroFuturisticProposal() {
  return (
    <div className="bg-[#0f0f1a] text-white overflow-hidden relative">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(251, 146, 60, 0.2) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 px-6 py-4 flex justify-between items-center border-b border-white/10">
        <span
          className="text-2xl font-bold tracking-widest"
          style={{
            fontFamily: "'Syncopate', Impact, sans-serif",
            background: "linear-gradient(135deg, #f472b6, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          REACT BISTRO
        </span>
        <div className="flex gap-6 font-mono text-sm uppercase tracking-wider text-white/70">
          <span className="hover:text-pink-400 cursor-pointer transition-colors">
            Menu
          </span>
          <span className="hover:text-pink-400 cursor-pointer transition-colors">
            About
          </span>
          <span className="hover:text-pink-400 cursor-pointer transition-colors">
            Contact
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 py-20 px-6 text-center">
        <div className="inline-block px-4 py-2 border border-pink-500/50 rounded-full mb-8">
          <span className="font-mono text-xs text-pink-400 tracking-widest uppercase">
            ◈ Dining Reimagined ◈
          </span>
        </div>

        <h1
          className="text-5xl md:text-8xl font-black uppercase leading-none mb-8 tracking-[-0.02em]"
          style={{
            fontFamily: "'Syncopate', Impact, sans-serif",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #fbbf24, #f472b6, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            FUTURE
          </span>
          <br />
          <span className="text-white">FLAVORS</span>
        </h1>

        <p className="text-white/60 max-w-lg mx-auto mb-10 font-mono">
          Where retro vibes meet tomorrow's taste. A culinary journey through
          time and space.
        </p>

        <button
          type="button"
          className="px-10 py-4 font-mono uppercase tracking-wider text-black font-bold rounded-full"
          style={{
            background: "linear-gradient(135deg, #fbbf24, #f472b6)",
          }}
        >
          Enter the Experience
        </button>
      </div>

      {/* Menu - Retro Cards */}
      <div className="relative z-10 px-6 pb-16">
        <div className="grid grid-cols-4 gap-4">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="group cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="relative aspect-square rounded-2xl overflow-hidden mb-3"
                style={{
                  background: `linear-gradient(135deg, rgba(${
                    i === 0
                      ? "244, 114, 182"
                      : i === 1
                        ? "129, 140, 248"
                        : i === 2
                          ? "251, 146, 60"
                          : "52, 211, 153"
                  }, 0.2), transparent)`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="font-mono text-xs text-pink-400">
                    {item.tag}
                  </span>
                </div>
              </div>
              <h3
                className="font-bold tracking-wide text-sm uppercase mb-1"
                style={{ fontFamily: "'Syncopate', sans-serif" }}
              >
                {item.name}
              </h3>
              <span className="font-mono text-pink-400">${item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Neon Footer */}
      <div
        className="relative z-10 py-6 text-center font-mono text-sm"
        style={{
          background:
            "linear-gradient(90deg, rgba(244, 114, 182, 0.1), rgba(129, 140, 248, 0.1))",
        }}
      >
        <span className="text-pink-400">★</span>
        <span className="mx-4 text-white/60">OPEN DAILY • 11AM - 2AM</span>
        <span className="text-indigo-400">★</span>
      </div>
    </div>
  );
}

/* ============================================
   PROPOSAL 5: EDITORIAL / MAGAZINE
   ============================================ */
function EditorialProposal() {
  return (
    <div className="bg-[#fafafa] text-[#1a1a1a] overflow-hidden">
      {/* Editorial Nav */}
      <nav className="border-b border-black/10 px-8 py-4 flex justify-between items-center">
        <span
          className="text-sm tracking-[0.3em] uppercase"
          style={{ fontFamily: "'IBM Plex Sans', Helvetica, sans-serif" }}
        >
          React Bistro
        </span>
        <div className="flex gap-8 text-xs tracking-[0.2em] uppercase text-black/50">
          <span className="hover:text-black cursor-pointer transition-colors">
            Menu
          </span>
          <span className="hover:text-black cursor-pointer transition-colors">
            Story
          </span>
          <span className="hover:text-black cursor-pointer transition-colors">
            Visit
          </span>
        </div>
      </nav>

      {/* Editorial Hero */}
      <div className="grid grid-cols-12 gap-4 p-8">
        <div className="col-span-5 flex flex-col justify-center">
          <span
            className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            Issue No. 01 — The Menu
          </span>
          <h1
            className="text-4xl md:text-5xl leading-[1.1] tracking-[-0.03em] mb-6"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            A Study in
            <br />
            <em>Modern Cuisine</em>
          </h1>
          <p
            className="text-black/60 leading-relaxed mb-8 text-sm"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Exploring the intersection of tradition and innovation, where every
            plate becomes a canvas and every meal a narrative.
          </p>
          <button
            type="button"
            className="self-start border border-black px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all"
            style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Read More →
          </button>
        </div>

        <div className="col-span-7">
          <div className="aspect-4/3 bg-black/5 overflow-hidden">
            <img
              src="/images/salmon.jpg"
              alt="Featured dish"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="mt-2 flex justify-between text-xs text-black/40"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span>01 — Salmon Steak</span>
            <span>$18.99</span>
          </div>
        </div>
      </div>

      {/* Editorial Grid */}
      <div className="border-t border-black/10 p-8">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-12 flex justify-between items-baseline border-b border-black/10 pb-2 mb-4">
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Featured Selections
            </span>
            <span
              className="text-xs text-black/40"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              04 Items
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {menuItems.map((item, i) => (
            <div key={item.name} className="group cursor-pointer">
              <div className="aspect-square bg-black/5 overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <span
                  className="text-xs text-black/40"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="text-xs text-black/40"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  ${item.price}
                </span>
              </div>
              <h3
                className="text-sm mt-1"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Footer */}
      <div
        className="border-t border-black/10 p-4 text-center"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        <span className="text-xs text-black/40 tracking-[0.2em] uppercase">
          © 2024 React Bistro • Photography by Local Artists
        </span>
      </div>
    </div>
  );
}

/* ============================================
   PROPOSAL 6: PLAYFUL / POP
   ============================================ */
function PlayfulProposal() {
  return (
    <div
      className="overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #fef3c7, #fce7f3, #e0e7ff)",
      }}
    >
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-32 h-32 rounded-full bg-orange-400 opacity-60 blur-xl"
          style={{
            top: "10%",
            left: "10%",
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-24 h-24 rounded-full bg-pink-400 opacity-60 blur-xl"
          style={{
            top: "60%",
            right: "15%",
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-40 h-40 rounded-full bg-violet-400 opacity-50 blur-xl"
          style={{
            bottom: "10%",
            left: "30%",
            animation: "float 7s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}</style>

      {/* Playful Nav */}
      <nav className="relative z-10 px-6 py-4 flex justify-between items-center">
        <span
          className="text-2xl font-black text-orange-600"
          style={{
            fontFamily: "'Fredoka', Comic Sans MS, cursive",
            animation: "wiggle 2s ease-in-out infinite",
          }}
        >
          React Bistro 🍳
        </span>
        <div className="flex gap-4">
          {["Menu", "About", "Cart"].map((item) => (
            <span
              key={item}
              className="px-4 py-2 bg-white/80 rounded-full text-sm font-bold text-orange-600 hover:bg-orange-500 hover:text-white cursor-pointer transition-all hover:scale-110"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero - Playful */}
      <div className="relative z-10 py-16 px-6 text-center">
        <div className="inline-block mb-6 px-6 py-2 bg-white/80 rounded-full">
          <span
            className="text-sm font-bold text-pink-600"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            🎉 50% off your first order!
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          <span className="text-orange-500">Yummy</span>
          <span className="text-pink-500"> Food</span>
          <br />
          <span className="text-violet-500">Happy</span>
          <span className="text-orange-500"> You!</span>
        </h1>

        <p
          className="text-lg text-gray-600 max-w-md mx-auto mb-8"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Delicious meals made with love, served with a smile! Order now and
          taste the happiness! 🥳
        </p>

        <button
          type="button"
          className="px-10 py-4 bg-orange-500 text-white font-bold rounded-full text-lg shadow-lg hover:bg-orange-600 hover:scale-105 hover:-rotate-1 transition-all"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          Order Now! 🍔
        </button>
      </div>

      {/* Menu - Playful Cards */}
      <div className="relative z-10 px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {menuItems.map((item, i) => (
            <div
              key={item.name}
              className="bg-white/90 rounded-3xl p-4 shadow-lg hover:shadow-xl hover:scale-105 hover:-rotate-1 transition-all cursor-pointer"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-linear-to-br from-orange-100 to-pink-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3
                    className="font-bold text-gray-800"
                    style={{ fontFamily: "'Fredoka', sans-serif" }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-xs font-bold text-pink-500"
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <span
                  className="text-lg font-black text-orange-500"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  ${item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playful Footer */}
      <div className="relative z-10 bg-orange-500 py-6 text-center">
        <span
          className="text-white font-bold text-lg"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          🌟 Made with ❤️ and lots of cheese 🧀
        </span>
      </div>
    </div>
  );
}
