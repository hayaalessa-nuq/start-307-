import React, { useState, useMemo } from 'react';
import Card from './Card';
import { getAIResponse } from '../services/geminiService';
import { CubeTransparentIcon, CloudIcon, LightBulbIcon } from './IconComponents';

// A simple counter component to animate numbers
const Counter: React.FC<{ value: number; decimals?: number }> = ({ value, decimals = 0 }) => {
    const [count, setCount] = useState(0);
  
    React.useEffect(() => {
      let start = 0;
      const end = value;
      if (start === end) return;
  
      const duration = 1500;
      const incrementTime = (duration / end) ;
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
  
      return () => clearInterval(timer);
    }, [value]);
  
    return <span>{count.toFixed(decimals)}</span>;
};

const WeeklyImpact: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fact, setFact] = useState('');

    const impactData = useMemo(() => {
        // Constants for calculation - based on estimates for NU-Q
        const NUQ_POPULATION = 400; // Estimated students + faculty/staff
        const AVG_CUPS_PER_PERSON_WEEKLY = 3; 
        const WASTE_PER_CUP_G = 15;
        const CO2_PER_CUP_G = 50;

        const totalWeeklyCups = NUQ_POPULATION * AVG_CUPS_PER_PERSON_WEEKLY;
        const totalWeeklyWasteKg = (totalWeeklyCups * WASTE_PER_CUP_G) / 1000;
        const totalWeeklyCO2Kg = (totalWeeklyCups * CO2_PER_CUP_G) / 1000;

        return {
            totalWeeklyCups,
            totalWeeklyWasteKg,
            totalWeeklyCO2Kg,
        };
    }, []);

    const handleGetFact = async () => {
        setIsLoading(true);
        setFact('');
        const prompt = `Generate a surprising but true, one-sentence fact about the environmental impact of single-use coffee cups or the benefits of reusable ones. The fact should be easily understandable for a university student. Examples: 'It can take up to 30 years for a single disposable coffee cup to decompose.' or 'Using a reusable cup for a year can save enough energy to power a lightbulb for over a week.' Just return the fact, no extra text.`;
        const systemInstruction = "You are a sustainability expert providing concise, impactful facts for an environmental campaign.";
        const response = await getAIResponse(prompt, systemInstruction);
        setFact(response);
        setIsLoading(false);
    };

    return (
        <section id="weekly-impact" className="py-16 md:py-24 bg-slate-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">NU-Q's Weekly Impact</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        This is the estimated weekly footprint of single-use cups on our campus.
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto">
                    <div className="p-6 md:p-8">
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto text-teal-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    <path d="M19.5 9.5c-1.3 0-2.5.5-3.4 1.4-.9-.9-2.1-1.4-3.4-1.4s-2.5.5-3.4 1.4c-.9-.9-2.1-1.4-3.4-1.4v7c1.3 0 2.5-.5 3.4-1.4.9.9 2.1 1.4 3.4 1.4s2.5-.5 3.4-1.4c.9.9 2.1 1.4 3.4 1.4v-7z" />
                                </svg>
                                <p className="text-4xl font-extrabold text-slate-800"><Counter value={impactData.totalWeeklyCups} /></p>
                                <p className="text-slate-600">Cups Used Weekly</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <CubeTransparentIcon className="w-10 h-10 mx-auto text-teal-500 mb-2" />
                                <p className="text-4xl font-extrabold text-slate-800"><Counter value={impactData.totalWeeklyWasteKg} decimals={0} /></p>
                                <p className="text-slate-600">Waste Generated (kg)</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-lg">
                                <CloudIcon className="w-10 h-10 mx-auto text-teal-500 mb-2" />
                                <p className="text-4xl font-extrabold text-slate-800"><Counter value={impactData.totalWeeklyCO2Kg} decimals={0} /></p>
                                <p className="text-slate-600">CO₂ Emissions (kg)</p>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <button
                                onClick={handleGetFact}
                                disabled={isLoading}
                                className="bg-white border border-teal-500 text-teal-600 font-bold py-3 px-6 rounded-md hover:bg-teal-50 disabled:opacity-50 transition flex items-center justify-center mx-auto"
                            >
                                <LightBulbIcon className="w-5 h-5 mr-2" />
                                {isLoading ? 'ECO is thinking...' : 'Did You Know?'}
                            </button>
                        </div>

                        {fact && (
                            <div className="mt-6 p-4 bg-teal-50 border-l-4 border-teal-400 rounded-r-md">
                                <p className="text-slate-700 text-center italic">"{fact}"</p>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default WeeklyImpact;