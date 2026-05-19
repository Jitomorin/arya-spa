import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#f5f5f0] pt-32 pb-10 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
          
          {/* About Us / Philosophy */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif text-[#c9a063] mb-6">About Us</h3>
            <p className="text-white/40 font-light max-w-md mb-6 leading-relaxed">
              At Arya's Wellness & Spa, we believe that true beauty begins with inner peace. Our philosophy is rooted in the "Aspa" tradition—finding harmony through nature's purest elements. Every treatment is a journey, and every guest is a priority.
            </p>
          </div>

          {/* Contact & Address */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">Location</h4>
            <ul className="space-y-4 font-light text-white/70">
              <li>Clover Bay Tower,</li>
              <li>6th Floor Shop No 612.</li>
              <li>Opposite Bamac Maison Bay's Edge.</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">Connect</h4>
            <ul className="space-y-4 font-light text-white/70">
              <li>
                <a href="tel:+971508959924" className="hover:text-[#c9a063] transition-colors">+971 508 959 924</a>
              </li>
              <li>
                <a href="mailto:info@aryaswellness.com" className="hover:text-[#c9a063] transition-colors">info@aryaswellness.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Massive Logo */}
        <div className="flex flex-col items-center border-t border-white/10 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center overflow-hidden"
          >
            <h1 className="text-[18vw] leading-none font-serif text-[#111] uppercase tracking-tighter select-none relative whitespace-nowrap">
              <span className="absolute inset-0 bg-gradient-to-b from-[#c9a063]/20 to-transparent bg-clip-text text-transparent opacity-50">
                ARYA'S
              </span>
              ARYA'S
            </h1>
          </motion.div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-10 text-xs text-white/30 uppercase tracking-widest font-sans">
            <p>&copy; {new Date().getFullYear()} Arya's Wellness & Spa. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}