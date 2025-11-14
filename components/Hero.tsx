
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center py-24 md:py-40 text-white"
      style={{ backgroundImage: "url('https://picsum.photos/1600/900?image=1060')" }}
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-4 shadow-lg">
          Your daily coffee doesn’t need daily waste.
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          Join the ReCupNUQ movement and make a sustainable choice, one cup at a time.
        </p>
      </div>
    </section>
  );
};

export default Hero;