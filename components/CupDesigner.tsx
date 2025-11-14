import React, { useState } from 'react';
import Card from './Card';
import { SparklesIcon } from './IconComponents';
import { getAIResponse } from '../services/geminiService';

const cupColors = ['#FFFFFF', '#E2E8F0', '#94A3B8', '#1E293B', '#14B8A6', '#F87171'];
const lidColors = ['#FFFFFF', '#64748B', '#1E293B', '#14B8A6'];

const CupDesigner: React.FC = () => {
    const [cupColor, setCupColor] = useState('#FFFFFF');
    const [lidColor, setLidColor] = useState('#64748B');
    const [customText, setCustomText] = useState('Your Name');
    const [slogan, setSlogan] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateSlogan = async () => {
        setIsGenerating(true);
        const prompt = `Generate a short, fun, and witty slogan about using a reusable coffee cup. It should be 2-5 words. Examples: "Sip Sustainably", "Refill & Repeat", "No Waste, Good Taste". Just return the slogan text, nothing else.`;
        const systemInstruction = "You are an AI that creates cool, short slogans for custom reusable coffee cups.";
        const response = await getAIResponse(prompt, systemInstruction);
        setSlogan(response.replace(/["']/g, "")); // Remove quotes from response
        setIsGenerating(false);
    };

    return (
        <section id="cup-designer" className="py-16 md:py-24 bg-slate-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Design Your Reusable Cup</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Get creative and make a cup that's uniquely yours.
                    </p>
                </div>
                <Card className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8 items-center">
                        {/* Cup Preview */}
                        <div className="bg-slate-50 rounded-lg p-6 flex justify-center items-center h-full aspect-square md:aspect-auto">
                            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[300px]" aria-label="Customizable reusable cup preview">
                                <g transform="translate(0, -5)">
                                    {/* Lid */}
                                    <path d="M 60 40 Q 100 35 140 40 L 145 50 L 55 50 Z" fill={lidColor} stroke="#4A5568" strokeWidth="1" />
                                    <rect x="85" y="25" width="30" height="10" rx="5" ry="5" fill={lidColor} stroke="#4A5568" strokeWidth="1" />
                                    
                                    {/* Cup Body */}
                                    <path d="M 55 50 L 70 160 Q 100 170 130 160 L 145 50 Z" fill={cupColor} stroke="#CBD5E0" strokeWidth="1" />
                                    
                                    {/* Sleeve */}
                                    <path d="M 62 85 L 138 85 L 133 125 L 67 125 Z" fill="#F7FAFC" stroke="#E2E8F0" strokeWidth="1" />
                                    
                                    {/* Custom Text */}
                                    <text x="100" y="110" fontFamily="Arial, sans-serif" fontSize="14" fill="#1E293B" textAnchor="middle" fontWeight="bold">
                                        {customText}
                                    </text>
                                    
                                    {/* Slogan */}
                                    <text x="100" y="150" fontFamily="Arial, sans-serif" fontSize="8" fill={cupColor === '#1E293B' ? '#FFFFFF' : '#475569'} textAnchor="middle" fontStyle="italic">
                                        {slogan}
                                    </text>
                                </g>
                            </svg>
                        </div>

                        {/* Customization Controls */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Cup Color</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cupColors.map(color => (
                                        <button key={color} onClick={() => setCupColor(color)} className={`w-10 h-10 rounded-full border-2 transition ${cupColor === color ? 'border-teal-500 scale-110' : 'border-transparent'}`} style={{backgroundColor: color}} aria-label={`Set cup color to ${color}`}></button>
                                    ))}
                                </div>
                            </div>
                             <div>
                                <h3 className="font-semibold text-slate-700 mb-2">Lid Color</h3>
                                <div className="flex flex-wrap gap-2">
                                    {lidColors.map(color => (
                                        <button key={color} onClick={() => setLidColor(color)} className={`w-10 h-10 rounded-full border-2 transition ${lidColor === color ? 'border-teal-500 scale-110' : 'border-transparent'}`} style={{backgroundColor: color}} aria-label={`Set lid color to ${color}`}></button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="custom-text" className="font-semibold text-slate-700 mb-2 block">Your Name / Initials</label>
                                <input
                                    id="custom-text"
                                    type="text"
                                    value={customText}
                                    onChange={(e) => setCustomText(e.target.value)}
                                    maxLength={12}
                                    placeholder="Your Name"
                                    className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={handleGenerateSlogan}
                                    disabled={isGenerating}
                                    className="w-full flex items-center justify-center bg-teal-500 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-600 disabled:bg-slate-400 transition"
                                >
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    {isGenerating ? 'Generating...' : 'Generate a Slogan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default CupDesigner;
