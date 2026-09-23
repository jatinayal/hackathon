import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

// Styles
import './styles/global.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/membership.css';
import './styles/courses.css';
import './styles/whychooseus.css';
import './styles/marquee.css';
import './styles/mentors.css';
import './styles/testimonials.css';
import './styles/faqs.css';
import './styles/footer.css';
import './styles/ui.css';
import './styles/rocket.css';

// Layout & UI Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LiveToast } from './components/ui/LiveToast';
import { FloatingToolButton } from './components/ui/FloatingToolButton';
import { FloatingRocketTrigger } from './components/ui/FloatingRocketTrigger';

// Phase 2 Interactive Rocket Sale Experience
import { RocketSaleModal } from './components/rocket/RocketSaleModal';

// Page Sections
import { HeroSection } from './components/sections/HeroSection';
import { MembershipSection } from './components/sections/MembershipSection';
import { CoursesSection } from './components/sections/CoursesSection';
import { WhyChooseUsSection } from './components/sections/WhyChooseUsSection';
import { FaangMarquee } from './components/sections/FaangMarquee';
import { MentorsSection } from './components/sections/MentorsSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';

function App() {
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const [isOfferRevealed, setIsOfferRevealed] = useState(false);

  useEffect(() => {
    // GSAP is initialized and ready for Phase 2 animation integration
    gsap.config({
      autoSleep: 60,
      force3D: true
    });
    console.log('⚡ STRIKE Homepage initialized with GSAP Phase 2 Rocket Experience');

    // Auto-trigger rocket sale experience after 1.2s delay upon entering website
    const autoTriggerTimer = setTimeout(() => {
      setIsRocketModalOpen(true);
    }, 1200);

    return () => clearTimeout(autoTriggerTimer);
  }, []);

  const handleClaimOffer = () => {
    setIsOfferRevealed(true);
    const membershipEl = document.getElementById('membership');
    if (membershipEl) {
      membershipEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="strike-app">
      {/* Floating Capsule Navigation */}
      <Navbar />

      {/* Floating UI Elements */}
      <FloatingRocketTrigger
        onClick={() => setIsRocketModalOpen(true)}
        isRevealed={isOfferRevealed}
      />
      <FloatingToolButton />
      <LiveToast />

      {/* Phase 2 Interactive Rocket Sale Modal */}
      <RocketSaleModal
        isOpen={isRocketModalOpen}
        onClose={() => setIsRocketModalOpen(false)}
        onMinimize={() => setIsRocketModalOpen(false)}
        onClaimOffer={handleClaimOffer}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <MembershipSection />
        <CoursesSection />
        <WhyChooseUsSection />
        <FaangMarquee />
        <MentorsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

