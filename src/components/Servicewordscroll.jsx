import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const DEFAULT_ITEMS = [
  'graduation shoots.',
  'event coverage.',
  'studio portraits.',
  'campaign visuals.',
];

// Posisi "band" highlight dari atas viewport — di titik ini kata yang lagi
// lewat bakal nyala ungu, sebelum & sesudahnya redup abu-abu.
const START_VH = 46;

export default function ServiceWordScroll({
  items = DEFAULT_ITEMS,
  ctaHref = '/portfolio',
  ctaLabel = 'See Our Portfolio',
}) {
  return (
    <section
      className="relative w-full bg-bgPrimary"
      style={{ ['--sw-count']: items.length, ['--sw-start']: `${START_VH}vh` }}
    >
      <style>{`
        .sw-header {
          position: sticky;
          top: calc((var(--sw-count) - 1) * -1lh);
          line-height: 1.05;
          min-height: 100svh;
          display: flex;
          align-items: center;
        }
        .sw-col {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
        }
        .sw-label {
          position: sticky;
          top: calc(var(--sw-start) - 3.2rem);
        }
        .sw-list {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: center;
        }
        .sw-list li {
          background: linear-gradient(
            180deg,
            rgba(11, 11, 12, 0.15) 0 calc(var(--sw-start) - 0.5lh),
            #6D28D9 calc(var(--sw-start) - 0.55lh) calc(var(--sw-start) + 0.55lh),
            rgba(11, 11, 12, 0.15) calc(var(--sw-start) + 0.5lh)
          );
          background-attachment: fixed;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }
      `}</style>

      {/* ── Transisi lembut dari hero (gelap) ke section ini (terang) — biar
         nggak kerasa "kepotong" tiba-tiba, bukan cuma warna nabrak langsung ── */}
      <div
        className="h-16 w-full md:h-24"
        style={{ background: 'linear-gradient(to bottom, #0B0E12, var(--color-bgPrimary, #fff))' }}
        aria-hidden="true"
      />

      {/* ── Sticky word-list ── */}
      <header className="sw-header px-6 pb-16 md:px-12 md:pb-24">
        <div className="sw-col">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="sw-label mb-6 font-mono text-xs uppercase tracking-[0.3em] text-textSecondary/50 md:text-sm"
          >
            // We offer
          </motion.span>

          <ul
            aria-hidden="true"
            className="sw-list w-full font-display text-[16vw] font-black uppercase leading-[1.05] md:text-[9vw]"
          >
            {items.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>

          {/* Versi teks biasa buat screen reader, karena list di atas aria-hidden */}
          <span className="sr-only">We offer {items.join(', ')}</span>
        </div>
      </header>

      {/* ── CTA ke portfolio — muncul setelah selesai scroll ngelewatin word-list,
         konten-nya fade+slide-up pas masuk viewport, bukan langsung nongol ── */}
      <main className="relative flex h-screen w-full items-center justify-center rounded-t-3xl bg-textPrimary px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to={ctaHref} className="group inline-flex flex-col items-center gap-6">
            <span className="font-display text-4xl font-black uppercase leading-none text-bgPrimary md:text-6xl">
              {ctaLabel}
            </span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accentPrimary text-bgPrimary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45 md:h-16 md:w-16">
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>
        </motion.div>
      </main>
    </section>
  );
}