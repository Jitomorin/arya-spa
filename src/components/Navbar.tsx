import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/LTS-logo.png';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Don't hide the navbar if the mobile menu is currently open
    if (latest > previous && latest > 150 && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = ['Home', 'About Us', 'Services', 'Contact'];

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-colors duration-500 ${
          isScrolled || isOpen ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Identity */}
          <Link to="/" onClick={() => setIsOpen(false)} className="relative z-[110] flex flex-col group">
            <img src={logo} alt="Arya's Wellness & Spa Logo" className="h-24 w-auto mb-1 group-hover:opacity-80 transition-opacity duration-300" />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase()}`}
                className="text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-6 relative z-[110]">
            <Link 
              to="/booking"
              className="hidden md:block px-6 py-2 border border-[#c9a063]/30 text-[#c9a063] text-sm uppercase tracking-widest rounded-full hover:bg-[#c9a063] hover:text-black transition-all duration-300"
            >
              Reserve
            </Link>
            
            {/* Mobile Hamburger Icon */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white/80 hover:text-white p-2 transition-transform duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X strokeWidth={1} size={28} /> : <Menu strokeWidth={1} size={28} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[90] bg-[#050505]/95 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    to={`/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-thin tracking-widest uppercase text-white hover:text-[#c9a063] transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                className="mt-8"
              >
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-[#c9a063] text-black text-sm uppercase tracking-widest rounded-full font-medium"
                >
                  Reserve Your Time
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}