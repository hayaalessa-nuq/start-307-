
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-teal-600 tracking-tight">
          ReCup<span className="text-teal-500">NUQ</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;