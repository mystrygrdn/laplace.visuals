import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const DEFAULT_ITEMS = [
  'graduation outdoor photoshoots.',
  'events.',
];

const START_VH = 46;

export default function ServiceWordScroll({
  items = DEFAULT_ITEMS,
  ctaHref = '/portfolio',
  ctaLabel = 'See Our Portfolio',
}) {
  return (
    <section
      className="
        relative
        w-full
        bg-bgPrimary
      "
      style={{
        '--sw-count': items.length,
        '--sw-start': `${START_VH}vh`,
      }}
    >
      {/* =====================================================
          WORD SCROLL STYLES
      ===================================================== */}
      <style>{`
        .sw-header {
          position: sticky;
          top: 0;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .sw-col {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: center;
        }

        .sw-label {
          position: relative;
          z-index: 2;
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
            rgba(11, 11, 12, 0.15)
              0
              calc(var(--sw-start) - 0.5lh),

            #6D28D9
              calc(var(--sw-start) - 0.55lh)
              calc(var(--sw-start) + 0.55lh),

            rgba(11, 11, 12, 0.15)
              calc(var(--sw-start) + 0.5lh)
          );

          background-attachment: fixed;

          color: transparent;

          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .sw-header {
            min-height: 90svh;
          }

          .sw-list li {
            background-attachment: scroll;
          }
        }
      `}</style>

      {/* =====================================================
          CLEAN TRANSITION
          
          Tidak menggunakan negative margin.
          Jadi section putih TIDAK akan memotong Hero.
      ===================================================== */}
      <div
        className="
          h-16
          w-full
          bg-bgPrimary
          md:h-20
        "
        aria-hidden="true"
      />

      {/* =====================================================
          STICKY WORD LIST
      ===================================================== */}
      <header
        className="
          sw-header
          px-5
          pb-16
          md:px-12
          md:pb-24
        "
      >
        <div className="sw-col">

          {/* LABEL */}
          <motion.span
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
            className="
              sw-label
              mb-6
              font-mono
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-textSecondary/50
              md:text-sm
            "
          >
            // We offer
          </motion.span>

          {/* BIG WORDS */}
          <ul
            aria-hidden="true"
            className="
              sw-list
              w-full
              font-display
              text-[15vw]
              font-black
              uppercase
              leading-[1.02]
              tracking-[-0.035em]
              md:text-[9vw]
            "
          >
            {items.map((word, i) => (
              <li key={i}>
                {word}
              </li>
            ))}
          </ul>

          {/* SCREEN READER */}
          <span className="sr-only">
            We offer {items.join(', ')}
          </span>
        </div>
      </header>

      {/* =====================================================
          PORTFOLIO CTA
      ===================================================== */}
      <main
        className="
          relative
          flex
          h-[85svh]
          w-full
          items-center
          justify-center
          rounded-t-[2rem]
          bg-textPrimary
          px-6
          text-center
          md:h-screen
          md:rounded-t-[3rem]
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link
            to={ctaHref}
            className="
              group
              inline-flex
              flex-col
              items-center
              gap-6
            "
          >
            {/* TITLE */}
            <span
              className="
                max-w-[90vw]
                font-display
                text-4xl
                font-black
                uppercase
                leading-[0.9]
                tracking-[-0.02em]
                text-bgPrimary
                md:text-6xl
              "
            >
              {ctaLabel}
            </span>

            {/* BUTTON */}
            <span
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-accentPrimary
                text-bgPrimary
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:rotate-45
                md:h-16
                md:w-16
              "
            >
              <ArrowUpRight className="h-6 w-6" />
            </span>
          </Link>
        </motion.div>
      </main>
    </section>
  );
}