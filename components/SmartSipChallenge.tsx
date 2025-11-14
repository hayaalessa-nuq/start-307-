import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../hooks/useUserProgress';
import Card from './Card';
import { SparklesIcon } from './IconComponents';

const SmartSipChallenge: React.FC = () => {
    const { 
        hasPledged, 
        userLogCount, 
        challenge, 
        isGenerating, 
        logCup, 
        generateNewChallenge 
    } = useUserProgress();
    
    const [justLogged, setJustLogged] = useState(false);

    // Effect to generate first challenge when component becomes visible
    useEffect(() => {
        if (hasPledged && !challenge && !isGenerating) {
            generateNewChallenge();
        }
    }, [hasPledged, challenge, isGenerating, generateNewChallenge]);

    const handleLogCup = () => {
        logCup();
        setJustLogged(true);
        setTimeout(() => setJustLogged(false), 1500);
    };

    const challengeProgress = challenge ? Math.max(0, userLogCount - challenge.startCount) : 0;
    const isChallengeComplete = challenge && challengeProgress >= challenge.goal;
    const progressPercentage = challenge ? Math.min((challengeProgress / challenge.goal) * 100, 100) : 0;

    return (
        <section id="smart-sip-challenge" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Your Smart Sip Challenge</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Turn your sustainable habits into a fun game with personalized AI challenges.
                    </p>
                </div>
                <Card className="max-w-2xl mx-auto">
                    <div className="p-6 md:p-8 text-center">
                        {!hasPledged ? (
                            <div>
                                <h3 className="text-xl font-bold text-slate-700">Ready to Start Your Challenge?</h3>
                                <p className="text-slate-600 mt-2 mb-6">Take the pledge to unlock your first personalized "Smart Sip" challenge and start tracking your impact!</p>
                                <a href="#pledge" className="bg-teal-500 text-white font-bold py-3 px-6 rounded-md hover:bg-teal-600 transition">
                                    Take the Pledge
                                </a>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold text-slate-700 flex items-center justify-center mb-4">
                                    <SparklesIcon className="w-6 h-6 mr-2 text-teal-500" />
                                    Your AI-Powered Challenge
                                </h3>
                                {isGenerating && !challenge && <p className="text-slate-500 animate-pulse my-8">Generating your first challenge...</p>}
                                
                                {challenge && !isChallengeComplete && (
                                    <>
                                        <p className="text-slate-600 text-lg mb-4">{challenge.description}</p>
                                        <div className="w-full bg-slate-200 rounded-full h-4 my-2">
                                            <div className="bg-teal-500 h-4 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                                        </div>
                                        <p className="text-right text-sm text-slate-500 mb-6">{challengeProgress} of {challenge.goal} cups saved</p>
                                    </>
                                )}

                                {isChallengeComplete && (
                                     <div className="my-6">
                                        <p className="font-semibold text-2xl text-teal-600">Challenge Complete! 🎉</p>
                                        <p className="text-slate-600 mt-2 mb-4">You're making a real difference. Ready for the next one?</p>
                                        <button onClick={generateNewChallenge} disabled={isGenerating} className="bg-teal-500 text-white font-bold py-3 px-6 rounded-md hover:bg-teal-600 disabled:bg-slate-400">
                                            {isGenerating ? 'Generating...' : 'Start New Challenge'}
                                        </button>
                                    </div>
                                )}

                                {!isChallengeComplete && (
                                    <>
                                        <button
                                            onClick={handleLogCup}
                                            className="w-full max-w-xs mx-auto px-6 py-3 text-lg font-bold text-white rounded-lg transition-transform transform duration-150 ease-in-out bg-teal-500 hover:bg-teal-600 active:scale-95 shadow-md"
                                        >
                                            I Used My Reusable Cup! ☕
                                        </button>
                                        {justLogged && <p className="text-teal-600 text-sm mt-2 animate-pulse">Awesome! Logged successfully.</p>}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default SmartSipChallenge;
