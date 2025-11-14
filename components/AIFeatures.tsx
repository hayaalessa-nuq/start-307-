
import React, { useState } from 'react';
import { getAIResponse } from '../services/geminiService';
import Card from './Card';

const AIFeatureCard: React.FC<{
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    systemInstruction: string;
}> = ({ title, description, placeholder, buttonText, systemInstruction }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setIsLoading(true);
        setResponse('');
        const aiResponse = await getAIResponse(input, systemInstruction);
        setResponse(aiResponse);
        setIsLoading(false);
    };

    return (
        <Card>
            <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-700 mb-2">{title}</h3>
                <p className="text-slate-600 mb-4">{description}</p>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder}
                        rows={3}
                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-600 disabled:bg-slate-400 transition"
                    >
                        {isLoading ? 'Thinking...' : buttonText}
                    </button>
                </form>
                {response && (
                    <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-md">
                        <p className="text-slate-700 whitespace-pre-wrap">{response}</p>
                    </div>
                )}
            </div>
        </Card>
    );
};

const ImpactCalculatorCard: React.FC = () => {
    const [cupsPerWeek, setCupsPerWeek] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [impactData, setImpactData] = useState<{ annualCups: number; annualWasteKg: number; annualCO2Kg: number; } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cups = parseInt(cupsPerWeek, 10);
        if (isNaN(cups) || cups <= 0) return;

        setIsLoading(true);
        setResponse('');
        setImpactData(null);

        // Constants for calculation
        const WEEKS_IN_YEAR = 52;
        const WASTE_PER_CUP_G = 15;
        const CO2_PER_CUP_G = 50;

        const annualCups = cups * WEEKS_IN_YEAR;
        const annualWasteKg = (annualCups * WASTE_PER_CUP_G) / 1000;
        const annualCO2Kg = (annualCups * CO2_PER_CUP_G) / 1000;

        setImpactData({ annualCups, annualWasteKg, annualCO2Kg });
        
        const prompt = `A student at my university uses ${cups} disposable coffee cups per week. Based on this, their annual usage is ${annualCups} cups, generating approximately ${annualWasteKg.toFixed(2)} kg of landfill waste and a carbon footprint of about ${annualCO2Kg.toFixed(2)} kg of CO2. Please provide an engaging and informative summary of this impact. Use a friendly, encouraging tone (not shaming) and make the numbers relatable with simple analogies (e.g., waste equivalent to X, or CO2 equivalent to charging a phone Y times). Conclude by highlighting the positive impact of switching to one reusable cup.`;
        
        const systemInstruction = "You are an environmental impact calculator assistant for a university sustainability campaign called ReCupNUQ. Your goal is to motivate students to switch to reusable cups by showing them their personal impact in a positive and empowering way. Your output should be formatted nicely for a web page.";

        const aiResponse = await getAIResponse(prompt, systemInstruction);
        setResponse(aiResponse);
        setIsLoading(false);
    };

    return (
        <Card>
            <div className="p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-700 mb-2">Your Impact Calculator</h3>
                <p className="text-slate-600 mb-4">See how small habits create big impacts. Enter your weekly single-use cup count to see your environmental footprint.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        value={cupsPerWeek}
                        onChange={(e) => setCupsPerWeek(e.target.value)}
                        placeholder="e.g., 5 cups per week"
                        min="1"
                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                        aria-label="Number of single-use cups per week"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-600 disabled:bg-slate-400 transition"
                    >
                        {isLoading ? 'Calculating...' : 'Calculate My Impact'}
                    </button>
                </form>
                <div className="mt-6 flex-grow">
                    {isLoading && !impactData && (
                        <div className="text-center p-4">
                            <p className="text-slate-600">Calculating your impact...</p>
                        </div>
                    )}
                    {impactData && (
                        <div className="p-4 bg-teal-50 border border-teal-200 rounded-md">
                            <h4 className="font-bold text-lg text-slate-700 mb-2">Your Annual Impact:</h4>
                            <div className="grid grid-cols-3 text-center mb-4 gap-2">
                               <div>
                                    <p className="text-2xl font-bold text-teal-600">{impactData.annualCups}</p>
                                    <p className="text-sm text-slate-600">Cups/Year</p>
                               </div>
                               <div>
                                    <p className="text-2xl font-bold text-teal-600">{impactData.annualWasteKg.toFixed(2)}</p>
                                    <p className="text-sm text-slate-600">kg of Waste</p>
                               </div>
                               <div>
                                    <p className="text-2xl font-bold text-teal-600">{impactData.annualCO2Kg.toFixed(2)}</p>
                                    <p className="text-sm text-slate-600">kg of CO₂</p>
                               </div>
                            </div>
                            {isLoading && <p className="text-center text-slate-600 animate-pulse">Generating insights...</p>}
                            {response && (
                                <p className="text-slate-700 whitespace-pre-wrap mt-2">{response}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};


const AIFeatures: React.FC = () => {
    return (
        <section id="ai-features" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">AI-Powered Sustainability Tools</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Use our smart tools to overcome challenges and discover new ways to be green on campus.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <AIFeatureCard
                        title="Myth Buster"
                        description="Got an excuse for using a disposable cup? Let our AI provide a persuasive, fact-based counter-argument."
                        placeholder="e.g., 'One cup doesn't really make a difference.'"
                        buttonText="Bust the Myth"
                        systemInstruction="You are a sustainability expert for a university campaign. Your goal is to debunk common myths about single-use waste with encouraging, factual, and concise responses. Be positive and solution-oriented."
                    />
                    <ImpactCalculatorCard />
                </div>
            </div>
        </section>
    );
};

export default AIFeatures;