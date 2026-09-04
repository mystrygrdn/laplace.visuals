import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Play } from 'lucide-react';
import { ArrowUpDown } from 'lucide-react';
import { teamData } from '../data/team';

const portfolioData = [
  {
    id: 1,
    title: "Darlene’s Graduation",
    subtitle: "UNSRAT Graduation Session",
    category: "Graduation",
    date: "2026-04-20",
    location: "Manado",
    client: "Darlene",
    cover: 'src/assets/graduationpics/darlene4.webp',
    photos: [
      { src: 'src/assets/graduationpics/darlene1.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/darlene2.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/darlene3.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/darlene4.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' }
    ],
  },
  {
    id: 2,
    title: "Aurora's Graduation",
    subtitle: "UNSRAT Graduation Session",
    category: "Graduation",
    date: "2026-04-20",
    location: "Manado",
    client: "Aurora",
    cover: 'https://picsum.photos/seed/pf2/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf2a/1200/800', caption: 'Crowd Entrance' },
      { src: 'https://picsum.photos/seed/pf2b/1200/800', caption: 'Stage Setup' },
      { src: 'https://picsum.photos/seed/pf2c/1200/800', caption: 'Fan Reactions' },
    ],
    team: [{ id: 1, role: 'Lead Photographer' }],
  },
  {
    id: 3,
    title: "Ivanka's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-06-18',
    location: 'Manado',
    client: 'Ivanka',
    cover: 'https://picsum.photos/seed/pf3/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf3a/1200/800', caption: 'Morning Brew' },
      { src: 'https://picsum.photos/seed/pf3b/1200/800', caption: 'Campus Corner' },
      { src: 'https://picsum.photos/seed/pf3c/1200/800', caption: 'Study Session' },
      { src: 'https://picsum.photos/seed/pf3d/1200/800', caption: 'Graduation Toast' },
      { src: 'https://picsum.photos/seed/pf3e/1200/800', caption: 'Group Portrait' },
    ],
    team: [{ id: 1, role: 'Lead Photographer' }, { id: 3, role: 'Second Shooter' }],
  },
  {
    id: 4,
    title: "Daniel's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-08-21',
    location: 'Malalayang Beach Walk, Manado',
    client: 'Daniel',
    cover: 'src/assets/danielhero.webp',
    photos: [
      { src: 'src/assets/danielhero.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/daniel1.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/daniel2.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/daniel3.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
      { id: 2, role: 'Lighting and Camera Assistant' },
      { id: 3, role: 'Lighting Assistant' },
    ],
  },
  {
    id: 5,
    title: "Shiny's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-08-20',
    location: 'Manado',
    client: 'Shiny',
    cover: 'src/assets/graduationpics/shiny1.webp',
    photos: [
      { src: 'src/assets/graduationpics/shiny1.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/shiny2.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/shiny3.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/shiny4.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 2, role: 'Lead Photographer' },
      { id: 1, role: 'Lighting and Camera Assistant' },
    ],
  },
  {
    id: 6,
    title: "Pranatania's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-08-20',
    location: 'Manado',
    client: 'Pranatania',
    cover: 'src/assets/graduationpics/pranat1.webp',
    photos: [
      { src: 'src/assets/graduationpics/pranat1.webp', caption: 'Close Up' },
      { src: 'src/assets/graduationpics/pranat2.webp', caption: 'Sound Wave' },
      { src: 'src/assets/graduationpics/pranat3.webp', caption: 'Studio Session' },
      { src: 'src/assets/graduationpics/pranat4.webp', caption: 'Studio Session' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
      { id: 2, role: 'Lighting and Camera Assistant' },
      { id: 4, role: 'Lighting Assistant' },
    ],
  },
  {
    id: 7,
    title: "Humairah's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-08-20',
    location: 'Manado',
    client: 'Humairah',
    cover: 'https://picsum.photos/seed/pf7/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf7a/1200/800', caption: 'Close Up' },
      { src: 'https://picsum.photos/seed/pf7b/1200/800', caption: 'Sound Wave' },
      { src: 'https://picsum.photos/seed/pf7c/1200/800', caption: 'Studio Session' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
      { id: 2, role: 'Lighting Assistant' },
      { id: 3, role: 'Lighting Assistant' },
      { id: 4, role: 'Lighting Assistant' },
    ],
  },
  {
    id: 8,
    title: "Aldyth's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-08-20',
    location: 'Manado',
    client: 'Aldyth',
    cover: 'src/assets/graduationpics/aldyth1.webp',
    photos: [
      { src: 'src/assets/graduationpics/aldyth1.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/aldyth2.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/aldyth3.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/aldyth4.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
      { id: 2, role: 'Lighting and Camera Assistant' },
      { id: 4, role: 'Lighting Assistant' },
    ],
  },
  {
    id: 9,
    title: "Cintanya's Graduation",
    subtitle: 'UNSRAT Graduation Session',
    category: 'Graduation',
    date: '2026-08-20',
    location: 'Manado',
    client: 'Cintanya',
    cover: 'src/assets/graduationpics/cintanya1.webp',
    photos: [
      { src: 'src/assets/graduationpics/cintanya1.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/cintanya2.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/cintanya3.webp', caption: 'Opening Shot' },
      { src: 'src/assets/graduationpics/cintanya4.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
      { id: 2, role: 'Lighting Assistant' },
    ],
  },
  {
    id: 10,
    title: '2026 Korea Tourism Seminar',
    subtitle: 'KTO Manado Seminar',
    category: 'Events',
    date: '2026-08-27',
    location: 'Four Points by Sheraton, Manado',
    client: 'Lokodi & KTO',
    cover: 'https://picsum.photos/seed/pf9/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf9a/1200/800', caption: 'Office Portrait' },
      { src: 'https://picsum.photos/seed/pf9b/1200/800', caption: 'City Backdrop' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
      { id: 2, role: 'Assistant Photographer' },
    ],
  },
  {
    id: 11,
    title: 'Munas XVIII HIPMI: Public Lecture',
    subtitle: 'UNSRAT Public Lecture Session',
    category: 'Events',
    date: '2026-05-12',
    location: 'Sam Ratulangi University, Manado',
    client: 'BPP HIPMI',
    cover: 'src/assets/eventspics/hipmi1.webp',
    photos: [
      { src: 'src/assets/eventspics/hipmi1.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi2.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi3.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi4.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
    ],
  },
  {
    id: 12,
    title: 'HIPMI Sulut Regional Conference',
    subtitle: 'Rakerda, Diklatda & Forbisda 2026',
    category: 'Events',
    date: '2026-05-01',
    location: 'Swiss-Belhotel Maleosan, Manado',
    client: 'BPD HIPMI Sulut',
    cover: 'src/assets/eventspics/hipmi6.webp',
    photos: [
      { src: 'src/assets/eventspics/hipmi7.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi8.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi9.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi10.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi11.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi12.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi13.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi14.webp', caption: 'Opening Shot' },
      { src: 'src/assets/eventspics/hipmi15.webp', caption: 'Opening Shot' },
    ],
    team: [
      { id: 1, role: 'Lead Photographer' },
    ],
  },
  {
    id: 13,
    type: 'video',
    title: "Bonifasius & Vallery Engagement Day",
    subtitle: 'B & V Engagement Highlight',
    category: 'Videography',
    date: '2026-08-09',
    location: 'Bakar Rica Paniki, Manado',
    client: 'Bonifasius & Vallery',
    cover: 'src/assets/eventspics/tunangan1.png',
    coverPosition: '75% 40%', // ⚠️ atur sendiri titik fokusnya kalau masih kepotong (format: "kiri-kanan% atas-bawah%")
    videoEmbedUrl: 'https://drive.google.com/file/d/1u_B-oFV16JcF6ybnIVK7nz1zYeU8Pngj/preview',
    team: [
      { id: 1, role: 'Videographer' },
    ],
  },
];

function resolveTeam(entries = []) {
  return entries
    .map(({ id, role }) => {
      const member = teamData.find((m) => m.id === id);
      if (!member) return null;
      return { ...member, role: role || member.role };
    })
    .filter(Boolean);
}

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatMonthYear(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function formatFullDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

const APPLE_SPRING = { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 };

function TeamStack({ team }) {
  const [hoveredId, setHoveredId] = useState(null);

  if (!team || team.length === 0) return null;

  return (
    <div className="flex items-center">
      {team.map((member, i) => (
        <div
          key={member.id}
          className={`relative ${i > 0 ? '-ml-3' : ''}`}
          style={{ zIndex: hoveredId === member.id ? 50 : team.length - i }}
          onMouseEnter={() => setHoveredId(member.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <AnimatePresence>
            {hoveredId === member.id && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
              >
                {member.name}
                <span className="block text-[10px] font-normal text-white/60 text-center leading-tight mt-0.5">
                  {member.role}
                </span>
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-neutral-900 rotate-45 -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-neutral-800 flex items-center justify-center text-white text-[10px] font-bold shadow-sm hover:scale-105 transition-transform duration-200 cursor-default">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              getInitials(member.name)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function CoverflowCarousel({ photos, activeIndex, setActiveIndex }) {
  const total = photos.length;
  const goTo = (i) => setActiveIndex(((i % total) + total) % total);

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 60;
    if (info.offset.x < -swipeThreshold) goTo(activeIndex + 1);
    else if (info.offset.x > swipeThreshold) goTo(activeIndex - 1);
  };

  return (
    <div
      className="relative w-full h-[26vh] md:h-[32vh] flex items-center justify-center overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {photos.map((photo, i) => {
        let offset = i - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const isActive = offset === 0;
        const absOffset = Math.abs(offset);
        if (absOffset > 2) return null;

        return (
          <motion.div
            key={photo.src}
            onClick={() => !isActive && goTo(i)}
            drag={isActive ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            animate={{
              x: `${offset * 62}%`,
              scale: isActive ? 1 : 0.76 - absOffset * 0.05,
              opacity: isActive ? 1 : 0.5 - absOffset * 0.1,
              rotateY: offset * -14,
              filter: isActive ? 'blur(0px) brightness(1)' : 'blur(2px) brightness(0.75)',
              zIndex: 10 - absOffset,
            }}
            transition={APPLE_SPRING}
            whileTap={isActive ? { scale: 0.97, transition: { duration: 0.15 } } : {}}
            className={`absolute w-[55%] md:w-[36%] aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-neutral-200 bg-neutral-100 ${
              isActive ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'
            }`}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform, filter, opacity' }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Kenapa perlu onMouseEnter/onMouseLeave di sini:
// Iframe adalah document terpisah dari halaman utama, jadi event mousemove
// yang dipakai custom cursor TIDAK PERNAH sampai ke document utama selama
// kursor berada di atas iframe — batasan browser, bukan bug. Fix: broadcast
// custom event biar CustomCursor tau harus sembunyi & munculin cursor asli
// browser di area ini.
function VideoEmbed({ embedUrl, title }) {
  const handleMouseEnter = () => {
    window.dispatchEvent(new CustomEvent('customcursor:hide'));
  };
  const handleMouseLeave = () => {
    window.dispatchEvent(new CustomEvent('customcursor:show'));
  };

  return (
    <div
      className="mx-auto w-full max-w-2xl aspect-video max-h-[46vh] rounded-xl overflow-hidden border border-neutral-200 bg-black"
      style={{ cursor: 'auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <iframe
        src={embedUrl}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  const isVideo = project.type === 'video';
  const [activeIndex, setActiveIndex] = useState(0);
  const total = isVideo ? 0 : project.photos.length;
  const projectTeam = resolveTeam(project.team);

  const handleNext = useCallback(() => {
    if (!isVideo) setActiveIndex((p) => (p + 1) % total);
  }, [isVideo, total]);
  const handlePrev = useCallback(() => {
    if (!isVideo) setActiveIndex((p) => (p - 1 + total) % total);
  }, [isVideo, total]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  // Lock scroll halaman di belakang selama modal terbuka. Ini nyetop
  // scroll native, TAPI project ini pakai Lenis (smooth-scroll berbasis JS)
  // yang nge-intercept wheel event secara global dan nggak otomatis patuh
  // ke body.style.overflow — makanya elemen modal-nya sendiri butuh atribut
  // data-lenis-prevent (lihat di bawah) biar Lenis berhenti nge-hijack
  // scroll pas kursor ada di atas modal.
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const activePhoto = !isVideo ? project.photos[activeIndex] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-md flex items-center justify-center p-3 md:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto bg-white rounded-2xl border border-neutral-200 shadow-2xl"
        style={{ overscrollBehavior: 'contain' }}
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pt-6 pb-1 px-6 md:px-10 text-center">
          <span className="text-neutral-400 text-[11px] font-mono uppercase tracking-widest">
            {project.category} · {formatMonthYear(project.date)}
          </span>
          <h2 className="text-neutral-900 text-xl md:text-2xl font-bold uppercase mt-1">
            {project.title}
          </h2>
          <p className="text-neutral-500 text-sm mt-1">{project.subtitle}</p>
        </div>

        <div className="relative mt-5 px-6 md:px-10">
          {isVideo ? (
            <VideoEmbed embedUrl={project.videoEmbedUrl} title={project.title} />
          ) : (
            <>
              <CoverflowCarousel
                photos={project.photos}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />

              <button
                onClick={handlePrev}
                aria-label="Foto sebelumnya"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 shadow flex items-center justify-center text-neutral-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Foto berikutnya"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 shadow flex items-center justify-center text-neutral-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {!isVideo && (
          <div className="text-center pt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={activePhoto.caption}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="text-neutral-900 font-medium text-sm"
              >
                {activePhoto.caption}
              </motion.p>
            </AnimatePresence>
            <span className="text-neutral-400 text-[11px] font-mono mt-0.5 block">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6 px-6 py-4 border-t border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <div className="text-center">
            <p className="text-neutral-400 mb-1">Date</p>
            <p className="text-neutral-900">{formatFullDate(project.date)}</p>
          </div>
          <div className="text-center">
            <p className="text-neutral-400 mb-1">Client</p>
            <p className="text-neutral-900">{project.client}</p>
          </div>
          <div className="text-center">
            <p className="text-neutral-400 mb-1 flex items-center gap-1 justify-center">
              <MapPin className="w-3 h-3" /> Location
            </p>
            <p className="text-neutral-900">{project.location}</p>
          </div>
        </div>

        {projectTeam.length > 0 && (
          <div className="flex flex-col items-center gap-2.5 px-6 pt-4 pb-6 border-t border-neutral-200">
            <p className="text-neutral-400 text-[11px] font-mono uppercase tracking-widest">Team</p>
            <TeamStack team={projectTeam} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function PortfolioCard({ item, index, onClick }) {
  const isVideo = item.type === 'video';

  return (
    <motion.button
      onClick={onClick}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: 'easeOut' }}
      className="group block text-left"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200">
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          style={{ objectPosition: item.coverPosition || 'center' }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <span className="absolute top-3 left-3 font-mono text-[11px] text-white bg-black/50 backdrop-blur px-2 py-0.5 rounded-full tracking-widest">
          [{String(index + 1).padStart(2, '0')}]
        </span>

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-5 h-5 text-neutral-900 fill-neutral-900 ml-0.5" />
            </span>
          </div>
        )}
      </div>

      <div className="pt-4">
        <h3 className="text-neutral-900 text-lg md:text-xl font-bold uppercase leading-tight transition-colors duration-300 group-hover:text-neutral-500">
          {item.title}
        </h3>
        <p className="text-neutral-400 text-[11px] uppercase tracking-widest mt-1 font-mono">
          {item.subtitle} · {formatMonthYear(item.date)}
        </p>
      </div>
    </motion.button>
  );
}

export default function PortfolioGrid() {
  const categories = ['All', 'Graduation', 'Events', 'Videography'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredItems = useMemo(() => {
    const byCategory =
      selectedCategory === 'All'
        ? portfolioData
        : portfolioData.filter((item) => item.category === selectedCategory);

    return [...byCategory].sort((a, b) => {
      const diff = new Date(a.date) - new Date(b.date);
      return sortOrder === 'newest' ? -diff : diff;
    });
  }, [selectedCategory, sortOrder]);

  return (
    <section className="w-full bg-white pt-32 md:pt-40 pb-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900">
            Laplace Archive
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 bg-neutral-100 p-1.5 rounded-full border border-neutral-200 w-fit">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOrder((s) => (s === 'newest' ? 'oldest' : 'newest'))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 font-bold text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
            </button>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => setSelectedProject(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center text-neutral-400 font-mono uppercase tracking-widest text-sm py-20">
            Tidak ada proyek pada kategori ini.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}