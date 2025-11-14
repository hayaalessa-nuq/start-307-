
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 border border-slate-100 ${className}`}>
      {children}
    </div>
  );
};

export default Card;