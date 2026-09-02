import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroPhoto from '../assets/danielhero.webp';

function WordsPullUp({ text, className = '', style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const words = text.split(' ');

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{
            y: 40,
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  y: 0,
                  opacity: 1,
                }
              : {}
          }
          transition={{
            duration: 0.75,
            delay: i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{
            marginRight:
              i === words.length - 1 ? 0 : '0.25em',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default function ThreeHeroBg() {
  return (
    <section
      className="
        relative
        w-screen
        overflow-hidden
        bg-black
      "
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
        height: 'calc(100svh - 72px)',
        minHeight: '620px',
      }}
    >
      {/* =====================================================
          HERO IMAGE
      ===================================================== */}
      <img
        src={heroPhoto}
        alt="Laplace Visuals"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        style={{
          objectPosition: 'center 20%',
        }}
      />

      {/* =====================================================
          IMAGE OVERLAY
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.15) 0%,
              rgba(0,0,0,0.02) 38%,
              rgba(0,0,0,0.12) 58%,
              rgba(0,0,0,0.78) 100%
            )
          `,
        }}
      />

      {/* =====================================================
          SUBTLE GRAIN
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.16]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* =====================================================
          BOTTOM SHADOW
          Tetap DI DALAM hero.
          Tidak keluar menutupi section berikutnya.
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-48
        "
        style={{
          background:
            'linear-gradient(to bottom, transparent, rgba(0,0,0,0.35))',
        }}
      />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          px-5
          pb-10
          sm:px-8
          md:px-12
          md:pb-12
        "
      >
        <div
          className="
            grid
            grid-cols-12
            items-end
            gap-6
          "
        >
          {/* =================================================
              TITLE
          ================================================= */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="
                font-display
                text-[clamp(4rem,10vw,8.5rem)]
                font-black
                uppercase
                leading-[0.78]
                tracking-[-0.045em]
                text-white
              "
            >
              <WordsPullUp text="Laplace Visuals" />
            </h1>
          </div>

          {/* =================================================
              DESCRIPTION + CTA
          ================================================= */}
          <div
            className="
              col-span-12
              lg:col-span-4
              lg:pb-2
            "
          >
            <motion.p
              initial={{
                y: 25,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                max-w-md
                font-sans
                text-sm
                leading-[1.5]
                text-white/75
                md:text-base
              "
            >
              We freeze authentic raw emotion, light,
              and stories in silver halide. An editorial
              photography studio with a{' '}
              <span className="font-brush text-white">
                Gen-Z edge
              </span>
              .
            </motion.p>

            <motion.div
              initial={{
                y: 25,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-4
              "
            >
              {/* EXPLORE BUTTON */}
              <button
                type="button"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-accentPrimary
                  py-1
                  pl-5
                  pr-1
                  font-mono
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  transition-all
                  duration-300
                  hover:gap-3
                  hover:bg-accentSecondary
                "
              >
                Explore Work

                <span
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                >
                  <ArrowRight
                    className="
                      h-4
                      w-4
                      text-accentPrimary
                    "
                  />
                </span>
              </button>

              {/* BOOK SESSION */}
              <a
                href="/contact"
                className="
                  font-mono
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-white/70
                  underline-offset-4
                  transition
                  duration-300
                  hover:text-white
                  hover:underline
                "
              >
                Book a Session
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL CUE
      ===================================================== */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.6,
        }}
        className="
          pointer-events-none
          absolute
          bottom-5
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          md:flex
        "
      >
        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-white/50
          "
        >
          Scroll
        </span>

        <svg
          className="
            h-4
            w-4
            animate-bounce
            text-white/50
          "
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