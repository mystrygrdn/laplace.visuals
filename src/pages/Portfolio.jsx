import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// =============================================
// DUMMY DATA
// =============================================
const portfolioData = [
  {
    id: 1,
    title: "Darlene’s Graduation",
    subtitle: "UNSRAT Graduation Session • April 2026",
    category: "Graduation",
    year: "2026",
    location: "Manado",
    client: "Darlene",
    cover: 'https://picsum.photos/seed/pf1/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf1a/1200/800', caption: 'Opening Shot' },
      { src: 'https://picsum.photos/seed/pf1b/1200/800', caption: 'Training Ground' },
      { src: 'https://picsum.photos/seed/pf1c/1200/800', caption: 'Final Sprint' },
      { src: 'https://picsum.photos/seed/pf1d/1200/800', caption: 'Team Huddle' },
    ],
    team: [
      { id: 't1a', name: 'Rangga Pratama', role: 'Lead Photographer', avatar: 'https://i.pravatar.cc/100?img=12' },
      { id: 't1b', name: 'Sinta Wulandari', role: 'Videographer', avatar: 'https://i.pravatar.cc/100?img=47' },
      { id: 't1c', name: 'Kevin Manoppo', role: 'Assistant', initials: 'KM' },
    ],
  },
  {
    id: 2,
    title: 'Visa x Wells Fargo',
    subtitle: 'Fan Fare',
    category: 'Events',
    year: '2025',
    location: 'Bandung',
    client: 'Visa',
    cover: 'https://picsum.photos/seed/pf2/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf2a/1200/800', caption: 'Crowd Entrance' },
      { src: 'https://picsum.photos/seed/pf2b/1200/800', caption: 'Stage Setup' },
      { src: 'https://picsum.photos/seed/pf2c/1200/800', caption: 'Fan Reactions' },
    ],
    team: [
      { id: 't2a', name: 'Michael Tan', role: 'Lead Photographer', avatar: 'https://i.pravatar.cc/100?img=33' },
      { id: 't2b', name: 'Alya Ramadhani', role: 'Event Coordinator', initials: 'AR' },
      { id: 't2c', name: 'Bagas Wicaksono', role: 'Drone Operator', avatar: 'https://i.pravatar.cc/100?img=15' },
      { id: 't2d', name: 'Nadia Kusuma', role: 'Videographer', initials: 'NK' },
    ],
  },
  {
    id: 3,
    title: 'Nescafé',
    subtitle: 'The Third Half',
    category: 'Graduation',
    year: '2024',
    location: 'Manado',
    client: 'Nescafé ID',
    cover: 'https://picsum.photos/seed/pf3/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf3a/1200/800', caption: 'Morning Brew' },
      { src: 'https://picsum.photos/seed/pf3b/1200/800', caption: 'Campus Corner' },
      { src: 'https://picsum.photos/seed/pf3c/1200/800', caption: 'Study Session' },
      { src: 'https://picsum.photos/seed/pf3d/1200/800', caption: 'Graduation Toast' },
      { src: 'https://picsum.photos/seed/pf3e/1200/800', caption: 'Group Portrait' },
    ],
    team: [
      { id: 't3a', name: 'Rangga Pratama', role: 'Lead Photographer', avatar: 'https://i.pravatar.cc/100?img=12' },
      { id: 't3b', name: 'Kevin Manoppo', role: 'Assistant', initials: 'KM' },
    ],
  },
  {
    id: 4,
    title: 'Superbet',
    subtitle: 'Bet Responsibly',
    category: 'Events',
    year: '2026',
    location: 'Surabaya',
    client: 'Superbet',
    cover: 'https://picsum.photos/seed/pf4/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf4a/1200/800', caption: 'Court Side' },
      { src: 'https://picsum.photos/seed/pf4b/1200/800', caption: 'Spin' },
    ],
    team: [
      { id: 't4a', name: 'Michael Tan', role: 'Lead Photographer', avatar: 'https://i.pravatar.cc/100?img=33' },
      { id: 't4b', name: 'Bagas Wicaksono', role: 'Drone Operator', avatar: 'https://i.pravatar.cc/100?img=15' },
    ],
  },
  {
    id: 5,
    title: 'Harman Kardon',
    subtitle: 'See / Hear',
    category: 'Graduation',
    year: '2024',
    location: 'Yogyakarta',
    client: 'Harman Kardon',
    cover: 'https://picsum.photos/seed/pf5/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf5a/1200/800', caption: 'Close Up' },
      { src: 'https://picsum.photos/seed/pf5b/1200/800', caption: 'Sound Wave' },
      { src: 'https://picsum.photos/seed/pf5c/1200/800', caption: 'Studio Session' },
    ],
    team: [
      { id: 't5a', name: 'Sinta Wulandari', role: 'Videographer', avatar: 'https://i.pravatar.cc/100?img=47' },
      { id: 't5b', name: 'Nadia Kusuma', role: 'Editor', initials: 'NK' },
    ],
  },
  {
    id: 6,
    title: 'Darktrace',
    subtitle: 'The Defenders',
    category: 'Events',
    year: '2026',
    location: 'Tangerang',
    client: 'Darktrace',
    cover: 'https://picsum.photos/seed/pf6/900/700',
    photos: [
      { src: 'https://picsum.photos/seed/pf6a/1200/800', caption: 'Office Portrait' },
      { src: 'https://picsum.photos/seed/pf6b/1200/800', caption: 'City Backdrop' },
    ],
    team: [
      { id: 't6a', name: 'Rangga Pratama', role: 'Lead Photographer', avatar: 'https://i.pravatar.cc/100?img=12' },
      { id: 't6b', name: 'Alya Ramadhani', role: 'Event Coordinator', initials: 'AR' },
      { id: 't6c', name: 'Kevin Manoppo', role: 'Assistant', initials: 'KM' },
    ],
  },
];

// Spring config bergaya Apple: cepat menuju target tapi ada sedikit "settle" halus di akhir
const APPLE_SPRING = { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 };

// =============================================
// TEAM AVATAR STACK — avatar saling menumpuk, hover muncul tooltip nama + peran
// =============================================
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
          {/* TOOLTIP */}
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
                {/* Arrow kecil di bawah tooltip */}
                <span className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-neutral-900 rotate-45 -mt-1" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* AVATAR */}
          <div className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-neutral-800 flex items-center justify-center text-white text-[10px] font-bold shadow-sm hover:scale-105 transition-transform duration-200 cursor-default">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              member.initials
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================
// COVERFLOW CAROUSEL — smooth spring + blur depth + drag/swipe
// =============================================
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

// =============================================
// MODAL DETAIL + CAROUSEL (white theme, fit viewport)
// =============================================
function ProjectModal({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = project.photos.length;

  const handleNext = useCallback(() => setActiveIndex((p) => (p + 1) % total), [total]);
  const handlePrev = useCallback(() => setActiveIndex((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  const activePhoto = project.photos[activeIndex];

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
        className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto bg-white rounded-2xl border border-neutral-200 shadow-2xl"
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
            {project.category}
          </span>
          <h2 className="text-neutral-900 text-xl md:text-2xl font-bold uppercase mt-1">
            {project.title}
          </h2>
          <p className="text-neutral-500 text-sm mt-1">{project.subtitle}</p>
        </div>

        <div className="relative mt-5">
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
        </div>

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

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-6 px-6 py-4 border-t border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-500">
          <div className="text-center">
            <p className="text-neutral-400 mb-1">Year</p>
            <p className="text-neutral-900">{project.year}</p>
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

        {/* TEAM SECTION — siapa saja yang berkontribusi di project ini */}
        {project.team && project.team.length > 0 && (
          <div className="flex flex-col items-center gap-2.5 px-6 pt-4 pb-6 border-t border-neutral-200">
            <p className="text-neutral-400 text-[11px] font-mono uppercase tracking-widest">Team</p>
            <TeamStack team={project.team} />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// =============================================
// CARD GRID
// =============================================
function PortfolioCard({ item, index, onClick }) {
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
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        <span className="absolute top-3 left-3 font-mono text-[11px] text-white bg-black/50 backdrop-blur px-2 py-0.5 rounded-full tracking-widest">
          [{String(index + 1).padStart(2, '0')}]
        </span>
      </div>

      <div className="pt-4">
        <h3 className="text-neutral-900 text-lg md:text-xl font-bold uppercase leading-tight transition-colors duration-300 group-hover:text-neutral-500">
          {item.title}
        </h3>
        <p className="text-neutral-400 text-[11px] uppercase tracking-widest mt-1 font-mono">
          {item.subtitle}
        </p>
      </div>
    </motion.button>
  );
}

// =============================================
// MAIN EXPORT
// =============================================
export default function PortfolioGrid() {
  const categories = ['All', 'Graduation', 'Events'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioData
      : portfolioData.filter((item) => item.category === selectedCategory);

  return (
    <section className="w-full bg-white pt-32 md:pt-40 pb-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-6 border-b border-neutral-200">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-neutral-900">
            Laplace Archive
          </h2>

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