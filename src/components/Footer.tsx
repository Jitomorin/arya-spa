import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#f5f5f0] pt-32 pb-10 px-6 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-32">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif text-[#c9a063] mb-6">Stay in the light.</h3>
            <p className="text-white/40 font-light max-w-sm mb-6">
              Subscribe to our private newsletter for exclusive retreat invitations and wellness insights.
            </p>
            <div className="flex border-b border-white/20 pb-2 max-w-sm focus-within:border-[#c9a063] transition-colors">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent w-full outline-none text-white placeholder:text-white/20 font-light"
              />
              <button className="text-sm uppercase tracking-widest text-[#c9a063] hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">Experience</h4>
            <ul className="space-y-4 font-light text-white/70">
              <li><a href="#" className="hover:text-[#c9a063] transition-colors">Hydrotherapy</a></li>
              <li><a href="#" className="hover:text-[#c9a063] transition-colors">Stone Massage</a></li>
              <li><a href="#" className="hover:text-[#c9a063] transition-colors">Aura Facials</a></li>
              <li><a href="#" className="hover:text-[#c9a063] transition-colors">Couples Retreat</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] text-white/50 mb-6">Sanctuary</h4>
            <ul className="space-y-4 font-light text-white/70">
              <li>Mombasa Retreat</li>
              <li>Mombasa County, Kenya</li>
              <li className="pt-4"><a href="mailto:reserve@aryas.com" className="hover:text-[#c9a063] transition-colors">reserve@aryas.com</a></li>
              <li><a href="tel:+254000000000" className="hover:text-[#c9a063] transition-colors">+254 000 000 000</a></li>
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
            <h1 className="text-[18vw] leading-none font-serif text-[#111] uppercase tracking-tighter select-none relative">
              <span className="absolute inset-0 bg-gradient-to-b from-[#c9a063]/20 to-transparent bg-clip-text text-transparent opacity-50">ARYA'S</span>
              ARYA'S
            </h1>
          </motion.div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-10 text-xs text-white/30 uppercase tracking-widest font-sans">
            <p>&copy; {new Date().getFullYear()} Arya's Wellness & Spa.</p>
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