import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { ArrowRight, Sparkles } from 'lucide-react';

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
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 mix-blend-difference pointer-events-none z-[100] transition-transform duration-75 ease-out flex items-center justify-center backdrop-blur-sm"
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const storyScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  const storyOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#f5f5f0] min-h-screen selection:bg-[#c9a063] selection:text-black overflow-hidden font-sans">
      <CustomCursor />

      {/* --- 1. HERO SECTION --- */}
      <motion.section 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
            alt="Arya's Sanctuary" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          {/* Layered gradients to blend image into the dark background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/60 to-[#050505]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(201,160,99,0.15)_0%,_transparent_70%)] rounded-full blur-[100px] animate-pulse mix-blend-screen" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center flex flex-col items-center mt-16"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm tracking-widest uppercase text-[#c9a063]"
          >
            <Sparkles size={14} /> The Ultimate Sanctuary
          </motion.div>

          <h1 className="text-6xl md:text-[9vw] leading-[0.85] font-thin tracking-tighter mb-8 text-shadow-xl">
            Where Wellness <br/>
            <span className="font-serif italic text-[#c9a063]">Becomes Art.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 font-light max-w-xl mb-12 drop-shadow-md">
            A sanctuary of restoration, beauty, and elevated living. Immerse yourself in a world crafted for your absolute peace.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden flex items-center gap-3 font-medium tracking-wide"
          >
            <span className="relative z-10">Begin Experience</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={18} />
            <div className="absolute inset-0 bg-[#c9a063] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
          </motion.button>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent z-10"
        />
      </motion.section>

      {/* --- 2. IMMERSIVE STORY SECTION --- */}
      <motion.section 
        style={{ scale: storyScale, opacity: storyOpacity }}
        className="relative min-h-screen flex items-center justify-center py-32 px-6"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[600px] rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-[#161616] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" 
              alt="Spa Atmosphere" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-thin mb-8 leading-tight">
              Rediscover your <br/>
              <span className="font-serif italic text-white/50">inner equilibrium.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8 font-light">
              Every detail at Arya's is meticulously designed to pull you away from the noise of the modern world. We blend ancient healing philosophies with state-of-the-art restorative technology.
            </p>
            <button className="border-b border-[#c9a063] text-[#c9a063] pb-1 hover:text-white hover:border-white transition-colors duration-300">
              Discover Our Philosophy
            </button>
          </div>
        </div>
      </motion.section>

      {/* --- 3. SERVICES EXPERIENCE --- */}
      <section className="py-32 px-6 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row justify-between items-end mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-thin tracking-tighter">
              Curated <br/> <span className="font-serif italic text-white/50">Rituals</span>
            </h2>
            <p className="text-white/40 max-w-sm text-right mt-6 md:mt-0 font-light">
              Transformative treatments tailored to your exact physical and spiritual needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Hydrotherapy", desc: "Purify and reset through thermal contrast.", price: "$120", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" },
              { title: "Stone Massage", desc: "Melt deeply held tension with volcanic heat.", price: "$180", img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop" },
              { title: "Aura Facial", desc: "Cellular rejuvenation utilizing rare botanicals.", price: "$150", img: "https://images.unsplash.com/photo-1615397323282-315ec0902c11?q=80&w=2080&auto=format&fit=crop" }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500 cursor-pointer"
              >
                <div className="h-56 mb-6 rounded-2xl bg-[#111] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-light">{service.title}</h3>
                  <span className="text-[#c9a063] font-serif">{service.price}</span>
                </div>
                <p className="text-white/40 font-light text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. CTA FOOTER --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(201,160,99,0.2)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
           <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop" 
              alt="Spa Texture" 
              className="w-full h-full object-cover rotate-180"
            />
        </div>
        
        <div className="text-center z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl font-thin tracking-tighter mb-10"
          >
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