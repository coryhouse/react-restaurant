import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/design-proposals-no-plugin")({
  component: DesignProposals,
});

interface Proposal {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroStyle: string;
  layoutStyle: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  features: string[];
  mockupComponent: React.FC;
}

// Proposal 1: Modern Minimalist
function ModernMinimalistMockup() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-light tracking-widest mb-2">BISTRO</h2>
            <p className="text-sm tracking-[0.3em] text-gray-300">
              FINE DINING
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <button type="button" className="px-6 py-2 border border-white text-white text-sm hover:bg-white hover:text-gray-900 transition">
                VIEW MENU
              </button>
              <button type="button" className="px-6 py-2 bg-white text-gray-900 text-sm hover:bg-gray-100 transition">
                RESERVE
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Preview */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {["Appetizers", "Mains", "Desserts"].map((cat) => (
            <div
              key={cat}
              className="text-center p-4 border border-gray-200 hover:border-gray-400 transition cursor-pointer"
            >
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full"></div>
              <p className="text-sm font-medium text-gray-800">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Proposal 2: Rustic Warmth
function RusticWarmthMockup() {
  return (
    <div className="bg-amber-50 rounded-lg overflow-hidden shadow-lg">
      {/* Hero Section */}
      <div className="relative h-64 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Crect%20fill%3D%22%23854d0e%22%20width%3D%2280%22%20height%3D%2280%22%2F%3E%3C%2Fsvg%3E')] bg-amber-800">
        <div className="absolute inset-0 bg-amber-900/80 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 border-4 border-amber-200 rounded-full flex items-center justify-center">
              <span className="text-amber-200 text-2xl">🍽️</span>
            </div>
            <h2 className="text-3xl font-serif text-amber-100 mb-2">
              The Golden Fork
            </h2>
            <p className="text-amber-200 italic">Farm-to-table since 1952</p>
            <button type="button" className="mt-6 px-8 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-500 transition">
              Explore Our Kitchen
            </button>
          </div>
        </div>
      </div>
      {/* Featured */}
      <div className="p-6">
        <h3 className="text-center text-amber-800 font-serif text-lg mb-4">
          Today's Specials
        </h3>
        <div className="space-y-3">
          {["Grandma's Pot Roast", "Fresh Apple Pie", "Homemade Bread"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
              >
                <div className="w-10 h-10 bg-amber-200 rounded-full"></div>
                <span className="text-amber-900 font-medium">{item}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

// Proposal 3: Bold & Vibrant
function BoldVibrantMockup() {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg overflow-hidden shadow-lg">
      {/* Hero Section */}
      <div className="relative h-64 flex items-center justify-center p-6">
        <div className="text-center text-white">
          <h2 className="text-5xl font-black mb-2 drop-shadow-lg">
            FLAVOR BLAST
          </h2>
          <p className="text-lg opacity-90">
            Where Every Bite is an Adventure!
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            {["🔥 Hot", "🌱 Vegan", "🍖 BBQ", "🍣 Fresh"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <button type="button" className="mt-6 px-8 py-3 bg-white text-orange-600 font-bold rounded-full hover:scale-105 transition transform">
            ORDER NOW
          </button>
        </div>
      </div>
      {/* Quick Menu */}
      <div className="bg-white p-6">
        <div className="grid grid-cols-4 gap-2">
          {["Burgers", "Pizza", "Tacos", "Drinks"].map((cat) => (
            <div
              key={cat}
              className="text-center p-3 bg-gradient-to-br from-orange-100 to-pink-100 rounded-xl cursor-pointer hover:from-orange-200 hover:to-pink-200 transition"
            >
              <div className="text-2xl mb-1">
                {cat === "Burgers" && "🍔"}
                {cat === "Pizza" && "🍕"}
                {cat === "Tacos" && "🌮"}
                {cat === "Drinks" && "🥤"}
              </div>
              <p className="text-xs font-semibold text-gray-700">{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Proposal 4: Elegant Dark
function ElegantDarkMockup() {
  return (
    <div className="bg-gray-950 rounded-lg overflow-hidden shadow-lg">
      {/* Hero Section */}
      <div className="relative h-64 border-b border-amber-500/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <span className="text-amber-400">✦</span>
              <span className="text-amber-400">✦</span>
              <span className="text-amber-400">✦</span>
            </div>
            <h2 className="text-3xl font-light text-white tracking-wider mb-2">
              NOIR
            </h2>
            <p className="text-amber-400 text-sm tracking-[0.4em]">CUISINE</p>
            <p className="text-gray-400 mt-4 italic text-sm">
              An unforgettable culinary journey
            </p>
            <button type="button" className="mt-6 px-8 py-2 border border-amber-400 text-amber-400 text-sm hover:bg-amber-400 hover:text-gray-950 transition">
              DISCOVER
            </button>
          </div>
        </div>
      </div>
      {/* Menu Categories */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "Tasting Menu", price: "$95" },
            { name: "Wine Pairing", price: "$65" },
            { name: "Chef's Table", price: "$150" },
            { name: "À La Carte", price: "Varies" },
          ].map((item) => (
            <div
              key={item.name}
              className="p-4 border border-gray-800 hover:border-amber-500/50 transition cursor-pointer"
            >
              <p className="text-white font-light">{item.name}</p>
              <p className="text-amber-400 text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Proposal 5: Fresh & Healthy
function FreshHealthyMockup() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-100 rounded-lg overflow-hidden shadow-lg">
      {/* Hero Section */}
      <div className="relative h-64 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-green-500 text-white text-xs rounded-full mb-4">
            <span>🌿</span> 100% Organic
          </div>
          <h2 className="text-4xl font-bold text-green-800 mb-2">
            Green Garden
          </h2>
          <p className="text-green-600">
            Nourish your body, delight your taste
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <button type="button" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Browse Menu
            </button>
            <button type="button" className="px-6 py-3 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-600 hover:text-white transition">
              Our Story
            </button>
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="bg-white/60 p-6">
        <div className="flex gap-3 justify-center flex-wrap">
          {["🥗 Salads", "🥣 Bowls", "🥤 Smoothies", "🥪 Wraps"].map((cat) => (
            <span
              key={cat}
              className="px-4 py-2 bg-white rounded-full shadow-sm text-green-700 text-sm font-medium cursor-pointer hover:shadow-md transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Proposal 6: Retro Diner
function RetroDinerMockup() {
  return (
    <div className="bg-red-600 rounded-lg overflow-hidden shadow-lg">
      {/* Hero Section */}
      <div
        className="relative h-64 flex items-center justify-center"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)",
        }}
      >
        <div className="text-center">
          <div className="bg-yellow-400 text-red-700 px-6 py-2 inline-block transform -rotate-2 mb-4">
            <span className="text-2xl font-black">★ OPEN 24/7 ★</span>
          </div>
          <h2
            className="text-5xl font-black text-white mb-2"
            style={{ textShadow: "3px 3px 0 #000" }}
          >
            ROSIE'S DINER
          </h2>
          <p className="text-yellow-300 text-lg">
            Good Food. Good Times. Since '58
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <button type="button" className="px-6 py-3 bg-yellow-400 text-red-700 font-bold rounded hover:bg-yellow-300 transition">
              🍔 SEE MENU
            </button>
            <button type="button" className="px-6 py-3 bg-white text-red-600 font-bold rounded hover:bg-gray-100 transition">
              📍 FIND US
            </button>
          </div>
        </div>
      </div>
      {/* Featured */}
      <div className="bg-black/90 p-6">
        <div className="flex justify-around text-center">
          {[
            { emoji: "🍔", name: "Burgers", price: "from $5.99" },
            { emoji: "🍟", name: "Fries", price: "from $2.99" },
            { emoji: "🥤", name: "Shakes", price: "from $3.99" },
          ].map((item) => (
            <div key={item.name} className="text-white">
              <span className="text-3xl">{item.emoji}</span>
              <p className="font-bold mt-1">{item.name}</p>
              <p className="text-yellow-400 text-sm">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const proposals: Proposal[] = [
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    tagline: "Less is more",
    description:
      "A clean, sophisticated design with plenty of white space. Perfect for upscale dining establishments that want to convey elegance and refinement. Typography-driven with subtle animations.",
    heroStyle: "Full-width gradient with centered text",
    layoutStyle: "Grid-based with generous spacing",
    colorScheme: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#ffffff",
      background: "#f9fafb",
    },
    features: [
      "Minimalist navigation",
      "Large typography",
      "Subtle hover effects",
      "Category cards with icons",
      "Reservation CTA prominent",
    ],
    mockupComponent: ModernMinimalistMockup,
  },
  {
    id: "rustic-warmth",
    name: "Rustic Warmth",
    tagline: "Farm-to-table experience",
    description:
      "Warm, inviting design with earthy tones and organic shapes. Ideal for farm-to-table restaurants, bakeries, or establishments with a homey atmosphere.",
    heroStyle: "Warm overlay with circular logo",
    layoutStyle: "Card-based with rounded corners",
    colorScheme: {
      primary: "#92400e",
      secondary: "#d97706",
      accent: "#fef3c7",
      background: "#fffbeb",
    },
    features: [
      "Serif typography",
      "Warm color palette",
      "Daily specials section",
      "Story-driven content",
      "Soft shadows and rounded elements",
    ],
    mockupComponent: RusticWarmthMockup,
  },
  {
    id: "bold-vibrant",
    name: "Bold & Vibrant",
    tagline: "Make a statement",
    description:
      "High-energy design with bold colors and playful elements. Perfect for casual dining, fast food, or restaurants targeting a younger demographic.",
    heroStyle: "Vibrant gradient with large bold text",
    layoutStyle: "Asymmetric with emoji accents",
    colorScheme: {
      primary: "#ea580c",
      secondary: "#db2777",
      accent: "#ffffff",
      background: "linear-gradient",
    },
    features: [
      "Bold, playful typography",
      "Emoji integration",
      "Tag-based filtering",
      "Prominent order button",
      "Interactive hover states",
    ],
    mockupComponent: BoldVibrantMockup,
  },
  {
    id: "elegant-dark",
    name: "Elegant Dark",
    tagline: "Sophisticated luxury",
    description:
      "Dark, luxurious theme with gold accents. Perfect for fine dining, wine bars, or establishments that want to convey exclusivity and premium quality.",
    heroStyle: "Dark background with gold accents",
    layoutStyle: "Grid with border treatments",
    colorScheme: {
      primary: "#030712",
      secondary: "#1f2937",
      accent: "#fbbf24",
      background: "#0a0a0a",
    },
    features: [
      "Dark mode design",
      "Gold accent colors",
      "Tasting menu focus",
      "Price display integration",
      "Subtle border animations",
    ],
    mockupComponent: ElegantDarkMockup,
  },
  {
    id: "fresh-healthy",
    name: "Fresh & Healthy",
    tagline: "Clean eating, clean design",
    description:
      "Light, airy design with green tones that convey freshness and health. Ideal for health food restaurants, juice bars, or vegan/vegetarian establishments.",
    heroStyle: "Soft gradient with organic badge",
    layoutStyle: "Open layout with pill buttons",
    colorScheme: {
      primary: "#166534",
      secondary: "#16a34a",
      accent: "#dcfce7",
      background: "#f0fdf4",
    },
    features: [
      "Green color palette",
      "Organic certification badges",
      "Category pills",
      "Clean, rounded buttons",
      "Nature-inspired elements",
    ],
    mockupComponent: FreshHealthyMockup,
  },
  {
    id: "retro-diner",
    name: "Retro Diner",
    tagline: "Classic American nostalgia",
    description:
      "Vintage-inspired design with bold reds, yellows, and a playful diner aesthetic. Perfect for diners, burger joints, or restaurants with a nostalgic theme.",
    heroStyle: "Bold red with vintage signage",
    layoutStyle: "Classic with bold typography",
    colorScheme: {
      primary: "#dc2626",
      secondary: "#facc15",
      accent: "#000000",
      background: "#ffffff",
    },
    features: [
      "Retro typography",
      "Bold red and yellow",
      "Vintage signage style",
      "Price-focused menu items",
      "24/7 availability emphasis",
    ],
    mockupComponent: RetroDinerMockup,
  },
];

function DesignProposals() {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Menu Homepage Design Proposals
              </h1>
              <p className="text-gray-600 mt-1">
                6 unique design concepts for your restaurant's menu page
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === "grid"
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Grid View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    viewMode === "list"
                      ? "bg-white shadow text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-3xl font-bold text-blue-600">
              {proposals.length}
            </p>
            <p className="text-gray-600 text-sm">Total Proposals</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-3xl font-bold text-green-600">3</p>
            <p className="text-gray-600 text-sm">Casual Dining</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-3xl font-bold text-purple-600">2</p>
            <p className="text-gray-600 text-sm">Fine Dining</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-3xl font-bold text-amber-600">1</p>
            <p className="text-gray-600 text-sm">Health-Focused</p>
          </div>
        </div>

        {/* Proposals Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposals.map((proposal) => (
              <button
                type="button"
                key={proposal.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer group text-left w-full"
                onClick={() => setSelectedProposal(proposal)}
              >
                {/* Mockup Preview */}
                <div className="transform scale-[0.85] origin-top -mb-8">
                  <proposal.mockupComponent />
                </div>

                {/* Info */}
                <div className="p-5 border-t border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                        {proposal.name}
                      </h3>
                      <p className="text-sm text-gray-500 italic">
                        {proposal.tagline}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {Object.values(proposal.colorScheme)
                        .slice(0, 3)
                        .map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{
                              backgroundColor: color.startsWith("linear")
                                ? "#ea580c"
                                : color,
                            }}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {proposal.description}
                  </p>
                  <span className="text-sm text-blue-600 font-medium hover:text-blue-800 transition">
                    View Details →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <button
                type="button"
                key={proposal.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer text-left w-full"
                onClick={() => setSelectedProposal(proposal)}
              >
                <div className="flex">
                  {/* Mockup Preview */}
                  <div className="w-80 flex-shrink-0 transform scale-[0.6] origin-top-left -mr-32 -mb-24">
                    <proposal.mockupComponent />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
                          {proposal.name}
                        </h3>
                        <p className="text-gray-500 italic">
                          {proposal.tagline}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {Object.values(proposal.colorScheme)
                          .slice(0, 4)
                          .map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{
                                backgroundColor: color.startsWith("linear")
                                  ? "#ea580c"
                                  : color,
                              }}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{proposal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {proposal.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {proposal.features.length > 3 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          +{proposal.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProposal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedProposal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedProposal.name}
                </h2>
                <p className="text-gray-500">{selectedProposal.tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProposal(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Full Mockup */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  Preview
                </h3>
                <selectedProposal.mockupComponent />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700">
                    {selectedProposal.description}
                  </p>
                </div>

                {/* Color Scheme */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Color Scheme
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(selectedProposal.colorScheme).map(
                      ([name, color]) => (
                        <div key={name} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg border border-gray-200"
                            style={{
                              backgroundColor: color.startsWith("linear")
                                ? "#ea580c"
                                : color,
                            }}
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {name}
                            </p>
                            <p className="text-xs text-gray-500">{color}</p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Layout Style */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Layout Style
                  </h3>
                  <p className="text-gray-700">
                    {selectedProposal.layoutStyle}
                  </p>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-4 mb-3">
                    Hero Style
                  </h3>
                  <p className="text-gray-700">{selectedProposal.heroStyle}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {selectedProposal.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                <button type="button" className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                  Select This Design
                </button>
                <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                  Request Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignProposals;
