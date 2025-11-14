
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <h3 className="text-2xl font-bold">ReCupNUQ</h3>
        <p className="mt-2 text-slate-300">
          A sustainable initiative at Northwestern University in Qatar.
        </p>
        <div className="mt-6">
          <p>Follow us on Instagram: <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-teal-400">@ReCupNUQ</a></p>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          © {new Date().getFullYear()} ReCupNUQ Campaign. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;