import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WeeklyImpact from './components/WeeklyImpact';
import ImpactExplorer3D from './components/ImpactExplorer3D';
import ActivationIdeas from './components/ActivationIdeas';
import PledgeSection from './components/PledgeSection';
import CollectiveImpact from './components/CollectiveImpact';
import SmartSipChallenge from './components/SmartSipChallenge';
import CupDesigner from './components/CupDesigner';
import AIFeatures from './components/AIFeatures';
import FAQ from './components/FAQ';
import EcoChatbot from './components/EcoChatbot';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [pledgeCount, setPledgeCount] = useState(0);
  const [hasPledged, setHasPledged] = useState(false);
  
  // Load initial state from localStorage
  useEffect(() => {
    const initialCount = parseInt(localStorage.getItem('pledgeCount') || '0', 10);
     if (initialCount === 0) {
        // Start with a random base if nothing is stored
        const randomBase = Math.floor(Math.random() * 30) + 10;
        setPledgeCount(randomBase);
        localStorage.setItem('pledgeCount', randomBase.toString());
    } else {
        setPledgeCount(initialCount);
    }

    const userPledged = localStorage.getItem('hasPledged') === 'true';
    setHasPledged(userPledged);
  }, []);

  const handlePledge = () => {
    if (!hasPledged) {
      const newCount = pledgeCount + 1;
      setPledgeCount(newCount);
      setHasPledged(true);
      localStorage.setItem('pledgeCount', newCount.toString());
      localStorage.setItem('hasPledged', 'true');
      // Force a reload or use another method to ensure all components pick up the change
      window.dispatchEvent(new Event('storage'));
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <WeeklyImpact />
        <ImpactExplorer3D />
        <ActivationIdeas />
        <PledgeSection 
          pledgeCount={pledgeCount} 
          hasPledged={hasPledged} 
          onPledge={handlePledge} 
        />
        <CollectiveImpact pledgeCount={pledgeCount} />
        <SmartSipChallenge />
        <CupDesigner />
        <AIFeatures />
        <FAQ />
      </main>
      <EcoChatbot />
      <Footer />
    </div>
  );
};

export default App;