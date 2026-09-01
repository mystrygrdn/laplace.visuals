import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroPhoto from '../assets/danielhero.webp'; // ⚠️ sesuaikan path. Ganti jadi <video> di bawah kalau kamu punya file video hero.

function WordsPullUp({ text, className = '', style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
          style={{ marginRight: i === words.length - 1 ? 0 : '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default function ThreeHeroBg() {
  return (
    <section className="relative left-1/2 h-[100svh] w-screen -translate-x-1/2 overflow-hidden">
      {/* Background photo. Kalau punya video hero, ganti jadi:
         <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src={heroVideo} /> */}
      <img
        src={heroPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />

      {/* noise overlay tipis biar foto nggak keliatan flat */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* gradient overlay — kontras buat teks putih */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/70" />

      {/* Konten hero. Navbar sengaja NGGAK dibikin di sini — pakai navbar kamu sendiri di luar komponen ini. */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 sm:px-6 md:px-10 md:pb-10">
        <div className="grid grid-cols-12 items-end gap-4">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-[18vw] font-black uppercase leading-[0.85] tracking-[-0.03em] text-white sm:text-[15vw] md:text-[13vw] lg:text-[11vw] xl:text-[10vw]">
              <WordsPullUp text="Laplace Visuals" />
            </h1>
          </div>

          <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-4">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-white/70 md:text-base"
              style={{ lineHeight: 1.5 }}
            >
              We freeze authentic raw emotion, light, and stories in silver
              halide. An editorial photography studio with a{' '}
              <span className="italic text-white">Gen-Z edge</span>.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4"
            >
              <button className="group inline-flex items-center gap-2 self-start rounded-full bg-violet-500 py-1 pl-5 pr-1 text-sm font-semibold text-white transition-all hover:gap-3 hover:bg-violet-400">
                Explore Work
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-violet-600" />
                </span>
              </button>
              <a
                href="/contact"
                className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-white hover:underline"
              >
                Book a Session
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <svg
          className="h-4 w-4 animate-bounce text-white/50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  );
}