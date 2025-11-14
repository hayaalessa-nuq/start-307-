import React, { useState, useMemo } from 'react';
import Card from './Card';
import { getAIResponse } from '../services/geminiService';
import { TrophyIcon, CubeTransparentIcon, CloudIcon } from './IconComponents';

interface CollectiveImpactProps {
  pledgeCount: number;
}

const CAMPAIGN_GOAL = 50;

const CollectiveImpact: React.FC<CollectiveImpactProps> = ({ pledgeCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');

  const impactData = useMemo(() => {
    // Constants for calculation
    const AVG_CUPS_PER_WEEK = 5; // Average cups a person uses
    const CAMPAIGN_DURATION_WEEKS = 4;
    const WASTE_PER_CUP_G = 15;
    const CO2_PER_CUP_G = 50;

    const totalCupsSaved = pledgeCount * AVG_CUPS_PER_WEEK * CAMPAIGN_DURATION_WEEKS;
    const totalWasteDivertedKg = (totalCupsSaved * WASTE_PER_CUP_G) / 1000;
    const totalCO2PreventedKg = (totalCupsSaved * CO2_PER_CUP_G) / 1000;

    return {
      totalCupsSaved,
      totalWasteDivertedKg,
      totalCO2PreventedKg,
    };
  }, [pledgeCount]);

  const progressPercentage = Math.min((pledgeCount / CAMPAIGN_GOAL) * 100, 100);

  const handleGetInsight = async () => {
    setIsLoading(true);
    setAiInsight('');
    const prompt = `The ReCupNUQ campaign currently has ${pledgeCount} pledges. This translates to an estimated saving of ${impactData.totalCupsSaved} single-use cups, diverting ${impactData.totalWasteDivertedKg.toFixed(2)} kg of waste from landfill, and preventing ${impactData.totalCO2PreventedKg.toFixed(2)} kg of CO2 emissions. Please write a short, celebratory, and motivational message for our website that makes this collective impact feel tangible and exciting for a university student audience. Use a fun, encouraging tone and include at least one emoji. Keep it concise (2-3 sentences).`;
    const systemInstruction = "You are ECO, the cheerful AI mascot for a university sustainability campaign. Your role is to celebrate the collective achievements of the community and motivate them to keep going.";
    const response = await getAIResponse(prompt, systemInstruction);
    setAiInsight(response);
    setIsLoading(false);
  };

  return (
    <section id="collective-impact" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Collective Impact</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            See what we can achieve when we work together. Every pledge counts!
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <div className="p-6 md:p-8">
            <h3 className="font-bold text-xl text-slate-700 mb-2">Progress to Goal</h3>
            <div className="w-full bg-slate-200 rounded-full h-4 mb-1">
              <div
                className="bg-teal-500 h-4 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-600 text-right mb-8">{pledgeCount} of {CAMPAIGN_GOAL} Pledges</p>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-slate-50 rounded-lg">
                <TrophyIcon className="w-10 h-10 mx-auto text-teal-500 mb-2" />
                <p className="text-3xl font-extrabold text-slate-800">{impactData.totalCupsSaved}</p>
                <p className="text-slate-600">Cups Saved</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <CubeTransparentIcon className="w-10 h-10 mx-auto text-teal-500 mb-2" />
                <p className="text-3xl font-extrabold text-slate-800">{impactData.totalWasteDivertedKg.toFixed(1)}</p>
                <p className="text-slate-600">Waste Diverted (kg)</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <CloudIcon className="w-10 h-10 mx-auto text-teal-500 mb-2" />
                <p className="text-3xl font-extrabold text-slate-800">{impactData.totalCO2PreventedKg.toFixed(1)}</p>
                <p className="text-slate-600">CO₂ Prevented (kg)</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
                <button 
                    onClick={handleGetInsight}
                    disabled={isLoading}
                    className="bg-white border border-teal-500 text-teal-600 font-bold py-3 px-6 rounded-md hover:bg-teal-50 disabled:opacity-50 transition"
                >
                    {isLoading ? 'ECO is thinking...' : 'What does this mean?'}
                </button>
            </div>

            {aiInsight && (
                 <div className="mt-6 p-4 bg-teal-50 border-l-4 border-teal-400 rounded-r-md">
                    <p className="text-slate-700 whitespace-pre-wrap">{aiInsight}</p>
                </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CollectiveImpact;
