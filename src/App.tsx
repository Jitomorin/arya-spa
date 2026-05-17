import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Services from './pages/Services';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-[#f5f5f0]">
        <Navbar />
        
        <main>
          <Routes>
             <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;