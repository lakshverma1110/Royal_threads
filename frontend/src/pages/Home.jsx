import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BlurText from "../components/blurtext";
import ShinyText from "../components/ShinyText";


export default function Home() {
  const collections = [
    {
      title: "Women",
      img: "https://picsum.photos/id/1011/800/600",
      link: "/women",
      desc: "Discover timeless designs that bring out your elegance and grace.",
    },
    {
      title: "Men",
      img: "https://picsum.photos/id/1012/800/600",
      link: "/men",
      desc: "Classic craftsmanship meets modern sophistication for men of style.",
    },
    {
      title: "Wedding",
      img: "https://picsum.photos/id/1013/800/600",
      link: "/wedding",
      desc: "A curated wedding collection designed to make your special day shine.",
    },
    {
      title: "Discover",
      img: "https://picsum.photos/id/1014/800/600",
      link: "/discover",
      desc: "Explore unique creations and handpicked designs made with passion.",
    },
  ];

  const handleAnimationComplete = () => {
    console.log("BlurText animation finished!");
  };

  // Smoothly scroll the page so the collections section is centered in the viewport.
  // If the collections element can't be found, fall back to the vertical center of the page.
  const handleShopNowClick = (e) => {
    e.preventDefault();
    const target = document.getElementById("collections");

    if (target) {
      // Center the target element in the viewport
      const rect = target.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      const targetCenter = absoluteTop + rect.height / 2 - window.innerHeight / 2;
      const top = Math.max(0, Math.round(targetCenter));
      window.scrollTo({ top, behavior: "smooth" });
      return;
    }

    // Fallback: center of the whole page
    const doc = document.documentElement;
    const scrollHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
    const center = Math.max(0, (scrollHeight - window.innerHeight) / 2);
    window.scrollTo({ top: center, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔹 Global Header */}
      <Header />

      {/* 🔹 Hero Section */}
      <section className="py-16 flex flex-col items-center text-center bg-gradient-to-b from-brand-mist to-white">
        <BlurText
          text="Discover Your Royal Style!"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-4xl md:text-5xl font-serif font-bold text-brand-navy"
        />

        <ShinyText
          text="Curated collections crafted for elegance."
          disabled={false}
          speed={3}
          className="mt-4 text-lg"
        />

        <a
          href="#collections"
          onClick={handleShopNowClick}
          className="inline-block mt-6 px-6 py-3 bg-brand-navy text-white font-semibold rounded-2xl border-2 border-brand-gold hover:bg-brand-gold hover:text-brand-navy transition"
        >
          Shop Now
        </a>
      </section>

      {/* 🔹 Four Vertical Collection Blocks */}
      <section id="collections" className="py-20 bg-white space-y-16 px-6 md:px-16">
        {collections.map((col, index) => (
          <Link
            key={index}
            to={col.link}
            className={`flex flex-col md:flex-row ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform hover:scale-[1.01] duration-300`}
          >
            {/* Image Side */}
            <img
              src={col.img}
              alt={col.title}
              className="w-full md:w-3/5 h-72 md:h-96 object-cover"
            />

            {/* Text Side */}
            <div className="w-full md:w-2/5 p-8 text-center md:text-left">
              <h2 className="text-3xl font-bold text-brand-navy mb-3 font-serif">
                {col.title} Collection
              </h2>
              <p className="text-brand-charcoal/80 mb-5 leading-relaxed">
                {col.desc}
              </p>
              <button className="px-6 py-2 bg-brand-navy text-white rounded-xl hover:bg-brand-gold hover:text-brand-navy transition">
                Explore Now
              </button>
            </div>
          </Link>
        ))}
      </section>

      {/* 🔹 Newsletter Signup */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-serif font-bold text-brand-navy">
          Stay in the Loop
        </h2>
        <p className="mt-2 text-brand-charcoal/80">
          Subscribe for updates, offers, and exclusive collections.
        </p>

        <div className="mt-6 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-lg border border-gray-300 w-72 focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <button className="px-6 py-2 rounded-r-lg bg-brand-gold text-brand-charcoal font-semibold hover:bg-brand-navy hover:text-white transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* 🔹 Footer */}
      <footer className="bg-brand-navy text-brand-ivory py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>Women</li>
              <li>Men</li>
              <li>Wedding</li>
              <li>Discover</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Sustainability</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-sm mt-6">
          © 2025 MyClothing. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
