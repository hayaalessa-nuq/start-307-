import React, { useState, useEffect } from 'react';
import { ViewfinderCircleIcon } from './IconComponents';

const CupPile: React.FC<{ style: React.CSSProperties; onClick: () => void }> = ({ style, onClick }) => (
    <button
        onClick={onClick}
        className="absolute w-12 h-12 text-red-400 hover:text-red-600 transition-colors duration-300"
        style={style}
        aria-label="View waste impact details"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M5.25 2.25a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Zm3.75 0a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
        <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md animate-pulse"></div>
    </button>
);

const ImpactExplorer3D: React.FC = () => {
    const [rotation, setRotation] = useState({ x: -20, y: -30 });
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        setRotation({ x: -y * 40, y: x * 60 });
    };
    
    const modals: { [key: string]: { title: string; text: string } } = {
        'waste1': { title: 'The Forum', text: 'Over 500 cups are disposed of near the main forum each week. Choosing a reusable cup here makes a huge difference.' },
        'waste2': { title: 'Library Café Area', text: 'Late night study sessions lead to hundreds of discarded cups. A reusable thermos keeps your drink warm for hours!' },
        'building': { title: 'Our Campus', text: 'This is a representation of our shared space. Together, we can keep it sustainable.' },
    };

    return (
        <section id="impact-explorer" className="py-16 md:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">3D Impact Explorer</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto flex items-center justify-center">
                        <ViewfinderCircleIcon className="w-6 h-6 mr-2 text-teal-500" />
                        Move your mouse over the scene to explore our campus impact.
                    </p>
                </div>
                
                <div
                    className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] rounded-lg bg-slate-100 border border-slate-200"
                    style={{ perspective: '1000px' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setRotation({ x: -20, y: -30 })}
                >
                    <div
                        className="absolute inset-0 transition-transform duration-300 ease-out"
                        style={{
                            transformStyle: 'preserve-3d',
                            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        }}
                    >
                        {/* Floor */}
                        <div className="absolute inset-0 bg-gradient-to-t from-teal-100 to-slate-50" style={{ transform: 'translateZ(-150px) rotateX(90deg) scale(1.5)' }}></div>

                        {/* Buildings */}
                        <div className="absolute w-40 h-60 bg-white/80 border border-slate-300 shadow-lg" style={{ transform: 'translateZ(-50px) translateX(-150px) translateY(-30px)', transformStyle: 'preserve-3d' }}>
                             <div className="absolute inset-0 bg-slate-200" style={{transform: 'rotateY(90deg) translateZ(20px)'}}></div>
                        </div>
                         <button className="absolute w-60 h-40 bg-white/80 border border-slate-300 shadow-lg hover:border-teal-400" 
                            style={{ transform: 'translateZ(20px) translateX(50px) translateY(20px)' }}
                            onClick={() => setActiveModal('building')}>
                            <span className="p-2 text-slate-600 font-semibold">NU-Q Building</span>
                        </button>

                        {/* Cup Piles */}
                        <CupPile style={{ transform: 'translateZ(10px) translateX(-50px) translateY(80px)' }} onClick={() => setActiveModal('waste1')} />
                        <CupPile style={{ transform: 'translateZ(50px) translateX(150px) translateY(90px)' }} onClick={() => setActiveModal('waste2')} />
                    </div>

                    {/* Modal */}
                    {activeModal && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10" onClick={() => setActiveModal(null)}>
                            <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm text-center transform transition-all animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                                <h4 className="text-xl font-bold text-teal-600 mb-2">{modals[activeModal].title}</h4>
                                <p className="text-slate-700 mb-4">{modals[activeModal].text}</p>
                                <button onClick={() => setActiveModal(null)} className="text-sm font-semibold text-slate-500 hover:text-slate-800">Close</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default ImpactExplorer3D;