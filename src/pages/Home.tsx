import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { Phone, Leaf, Building, Users, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);
  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 mix-blend-difference pointer-events-none z-[100] transition-transform duration-75 ease-out flex items-center justify-center backdrop-blur-sm">
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), orientation: 'vertical', smoothWheel: true });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#f5f5f0] min-h-screen selection:bg-[#c9a063] selection:text-black overflow-hidden font-sans">
      <CustomCursor />

      {/* --- 1. HERO SECTION --- */}
      <motion.section style={{ y: heroY, opacity: heroOpacity }} className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" alt="Arya's Sanctuary" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(201,160,99,0.15)_0%,_transparent_70%)] rounded-full blur-[100px] animate-pulse mix-blend-screen" />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 text-center flex flex-col items-center mt-16">
          <h1 className="text-5xl md:text-[7vw] leading-[1.1] font-thin tracking-tighter mb-8 text-shadow-xl max-w-4xl">
            Get the help you need <br/>
            <span className="font-serif italic text-[#c9a063]">and call for a consultation</span>
          </h1>
          
          <motion.a href="tel:+971508959924" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden flex items-center gap-3 font-medium tracking-wide">
            <span className="relative z-10">Call Us: +971 508 959 924</span>
            <Phone className="relative z-10" size={18} />
            <div className="absolute inset-0 bg-[#c9a063] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
          </motion.a>
        </motion.div>
      </motion.section>

      {/* --- 2. PILLARS SECTION --- */}
      <section className="py-24 px-6 bg-[#050505] relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: Leaf, title: "Holistic Wellness", desc: "We use only the finest hot oils, volcanic stones, and organic Moroccan soaps to ensure your skin is as pampered as your mind." },
            { icon: Building, title: "Luxury Ambience", desc: "Step away from the city noise into a temperature-controlled, aromatic environment designed for total sensory relaxation." },
            { icon: Users, title: "Expert Therapists", desc: "Our highly trained therapists specialize in global techniques, from traditional Thai stretching to synchronized 4-hand rituals. Swedish, Arabic & Thai massages." }
          ].map((pillar, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <pillar.icon className="text-[#c9a063] mb-6" size={40} strokeWidth={1} />
              <h3 className="text-2xl font-light mb-4">{pillar.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 3. IMMERSIVE STORY SECTION --- */}
      <section className="relative flex items-center justify-center py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-thin mb-10 leading-tight">
            Experience the Art of <br/>
            <span className="font-serif italic text-[#c9a063]">Holistic Healing & Luxury Relaxation</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-white/50 text-lg md:text-xl leading-relaxed font-light">
            Step into a world where stress melts away. From the rhythmic flow of a Thai massage to the purifying heat of a Moroccan bath, Arya's Wellness & Spa offers a bespoke journey for your body and soul. Our expert therapists and tranquil atmosphere provide the perfect escape from the everyday.
          </motion.p>
        </div>
      </section>

      {/* --- 4. SIGNATURE EXPERIENCES EXTRA SECTION --- */}
      <section className="py-24 px-6 bg-[#080808] relative z-20 border-t border-b border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#c9a063] uppercase tracking-[0.3em] text-xs font-semibold block mb-3">Elevated Offerings</span>
            <h2 className="text-3xl md:text-4xl font-thin">Exclusive Elite Rituals</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Synchronized 4-Hands Massage", desc: "Two expert therapists work in seamless harmony, utilizing choreographic fluid movements to ease deep-seated muscle tension and completely rest your sensory pathways.", img: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop" },
              { title: "Bespoke Couple’s Massage", desc: "A side-by-side restorative sanctuary for partners. Shared aromatic atmospheres curated to provide a deeply synchronized, peaceful escape from the pressures of city life.", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop" }
            ].map((elite, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="group grid grid-cols-1 sm:grid-cols-2 bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="h-48 sm:h-auto overflow-hidden relative">
                  <img src={elite.img} alt={elite.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-50 group-hover:opacity-80" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-light mb-2 flex items-center gap-2"><Sparkles size={14} className="text-[#c9a063]" />{elite.title}</h3>
                  <p className="text-white/40 font-light text-xs leading-relaxed mb-4">{elite.desc}</p>
                  <button className="text-xs text-[#c9a063] tracking-widest uppercase self-start border-b border-[#c9a063]/30 pb-0.5 hover:text-white hover:border-white transition-colors">Inquire</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. SERVICES SLIDER --- */}
      <section className="py-32 bg-black relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <h2 className="text-5xl md:text-7xl font-thin tracking-tighter">
            Curated <span className="font-serif italic text-white/50">Rituals</span>
          </h2>
          <div className="hidden md:flex gap-4">
            <button onClick={() => scrollSlider('left')} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"><ChevronLeft size={24} /></button>
            <button onClick={() => scrollSlider('right')} className="p-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-colors"><ChevronRight size={24} /></button>
          </div>
        </div>

        {/* Draggable Slider Container */}
        <div ref={sliderRef} className="flex gap-8 px-6 md:px-12 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            { title: "Thai Massage", desc: "An ancient healing ritual combining acupressure and assisted yoga postures to improve flexibility and energy flow.", img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" },
            { title: "Swedish Massage", desc: "The classic relaxation therapy. Gentle, long strokes designed to ease muscle tension and improve circulation.", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop" },
            { title: "Arabic Massage", desc: "A traditional deep-tissue technique focusing on pressure points to revitalize the body and spirit, and steady rhythm to ease tension.", img: "https://images.unsplash.com/photo-1615397323282-315ec0902c11?q=80&w=2080&auto=format&fit=crop" },
            { title: "Moroccan Bath (Hammam)", desc: "A purifying steam treatment using traditional black soap to deeply cleanse and rejuvenate your skin.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" }
          ].map((service, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="min-w-[85vw] md:min-w-[400px] snap-center group p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 cursor-pointer flex-shrink-0">
              <div className="h-64 mb-6 rounded-2xl bg-[#111] overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
              </div>
              <h3 className="text-2xl font-light mb-3">{service.title}</h3>
              <p className="text-white/40 font-light text-sm mb-6">{service.desc}</p>
              <button className="text-[#c9a063] uppercase tracking-widest text-xs border-b border-[#c9a063] pb-1 hover:text-white hover:border-white transition-colors">Book Now</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- 6. CTA SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(201,160,99,0.2)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
           <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" alt="Spa Texture" className="w-full h-full object-cover rotate-180" />
        </div>
        
        <div className="text-center z-10">
          <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-6xl md:text-8xl font-thin tracking-tighter mb-10">
            Begin Your <br/> <span className="font-serif italic text-[#c9a063]">Transformation.</span>
          </motion.h2>
          
          <button className="px-12 py-5 bg-black/50 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all duration-500 backdrop-blur-md">
            Reserve Your Time
          </button>
        </div>
      </section>
    </div>
  );
}