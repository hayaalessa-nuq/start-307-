import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { sendMessageToEco } from '../services/geminiService';
import { useUserProgress } from '../hooks/useUserProgress';
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon, UserCircleIcon, SparklesIcon, ShieldCheckIcon } from './IconComponents';

const initialMessage: ChatMessage = { sender: 'bot', text: "Hi there! I'm ECO, your guide to the ReCupNUQ campaign. Ask me anything about sustainability or our events! 🌿" };
const pledgedInitialMessage: ChatMessage = { sender: 'bot', text: "Welcome back! Great to see you're part of the movement. Don't forget to log your progress in your personal dashboard (click the user icon in the top right!). 📈" };

const EcoChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<'chat' | 'dashboard'>('chat');
    
    // User Progress from custom hook
    const { 
        userLogCount, 
        hasPledged, 
        challenge, 
        badges, 
        isGenerating, 
        logCup, 
        generateNewChallenge 
    } = useUserProgress();
    
    const [justLogged, setJustLogged] = useState(false);

    const chatboxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
       setMessages(hasPledged ? [pledgedInitialMessage] : [initialMessage]);
    }, [hasPledged]);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, view]);

    // Effect to generate challenge when dashboard is opened
    useEffect(() => {
        if (isOpen && view === 'dashboard' && hasPledged && !challenge && !isGenerating) {
            generateNewChallenge();
        }
    }, [isOpen, view, hasPledged, challenge, isGenerating, generateNewChallenge]);


    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        const botResponse = await sendMessageToEco(userInput);

        setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
        setIsLoading(false);
    };
    
    const handleLogCup = () => {
        logCup();
        setJustLogged(true);
        setTimeout(() => setJustLogged(false), 1500);
    };

    // Derived state for impact and challenges
    const WASTE_PER_CUP_G = 15;
    const CO2_PER_CUP_G = 50;
    const userWasteKg = (userLogCount * WASTE_PER_CUP_G) / 1000;
    const userCO2Kg = (userLogCount * CO2_PER_CUP_G) / 1000;
    
    const challengeProgress = challenge ? Math.max(0, userLogCount - challenge.startCount) : 0;
    const isChallengeComplete = challenge && challengeProgress >= challenge.goal;
    const progressPercentage = challenge ? Math.min((challengeProgress / challenge.goal) * 100, 100) : 0;

    const DashboardView = () => (
        <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto bg-slate-50 text-center">
            <h4 className="text-2xl font-bold text-slate-700">Your Personal Impact</h4>
            <p className="text-slate-600 text-sm">Log every time you use a reusable cup to see your positive impact grow!</p>
            
            <div className="py-2">
                <button
                    onClick={handleLogCup}
                    className="w-full px-6 py-3 text-lg font-bold text-white rounded-lg transition-transform transform duration-150 ease-in-out bg-teal-500 hover:bg-teal-600 active:scale-95 shadow-md"
                >
                    I Used My Reusable Cup! ☕
                </button>
                {justLogged && <p className="text-teal-600 text-sm mt-2 animate-pulse">Awesome! Logged successfully.</p>}
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
                <div>
                    <p className="text-3xl font-extrabold text-teal-600">{userLogCount}</p>
                    <p className="text-xs font-medium text-slate-600">Cups Saved</p>
                </div>
                <div>
                    <p className="text-3xl font-extrabold text-teal-600">{userWasteKg.toFixed(2)}</p>
                    <p className="text-xs font-medium text-slate-600">Waste Saved (kg)</p>
                </div>
                <div>
                    <p className="text-3xl font-extrabold text-teal-600">{userCO2Kg.toFixed(2)}</p>
                    <p className="text-xs font-medium text-slate-600">CO₂ Saved (kg)</p>
                </div>
            </div>

            {/* Smart Sip Challenge */}
            <div className="p-4 bg-white rounded-lg shadow-inner text-left">
                <h5 className="font-bold text-slate-700 flex items-center mb-2"><SparklesIcon className="w-5 h-5 mr-2 text-teal-500" /> Smart Sip Challenge</h5>
                {isGenerating && !challenge && <p className="text-sm text-slate-500 animate-pulse">Generating your first challenge...</p>}
                {challenge && !isChallengeComplete && (
                    <>
                        <p className="text-sm text-slate-600 mb-2">{challenge.description}</p>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-teal-500 h-2.5 rounded-full" style={{width: `${progressPercentage}%`}}></div>
                        </div>
                        <p className="text-right text-xs text-slate-500 mt-1">{challengeProgress} / {challenge.goal} cups</p>
                    </>
                )}
                {isChallengeComplete && (
                     <div className="text-center">
                        <p className="font-semibold text-teal-600">Challenge Complete! 🎉</p>
                        <button onClick={generateNewChallenge} disabled={isGenerating} className="mt-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-full px-4 py-1 disabled:bg-slate-400">
                            {isGenerating ? 'Generating...' : 'Start New Challenge'}
                        </button>
                    </div>
                )}
            </div>

            {/* Badges */}
             <div className="p-4 bg-white rounded-lg shadow-inner text-left">
                <h5 className="font-bold text-slate-700 mb-2">Your Badges</h5>
                {badges.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {badges.map(badge => (
                            <div key={badge.milestone} className="text-center p-2 bg-slate-100 rounded-lg" title={`Earned for ${badge.milestone} cups`}>
                                <ShieldCheckIcon className="w-8 h-8 mx-auto text-yellow-500" />
                                <p className="text-xs font-semibold text-slate-700 mt-1 leading-tight">{badge.name}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-600 text-sm">Log your first cup to earn a badge!</p>
                )}
            </div>
        </div>
    );

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-teal-500 text-white rounded-full p-4 shadow-lg hover:bg-teal-600 transition transform hover:scale-110"
                    aria-label="Open Chatbot"
                >
                    {isOpen ? <XMarkIcon className="w-8 h-8"/> : <ChatBubbleLeftRightIcon className="w-8 h-8" />}
                </button>
            </div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[500px] z-50 bg-white rounded-lg shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out origin-bottom-right">
                    <div className="p-4 bg-teal-500 text-white rounded-t-lg flex justify-between items-center">
                        <h3 className="text-xl font-bold text-center flex-grow">{view === 'chat' ? 'Chat with ECO' : 'Your Dashboard'}</h3>
                        {hasPledged && (
                             <button 
                                onClick={() => setView(view === 'chat' ? 'dashboard' : 'chat')} 
                                className="text-white hover:bg-teal-600 p-1 rounded-full"
                                aria-label={view === 'chat' ? 'Open Dashboard' : 'Back to Chat'}
                             >
                                <UserCircleIcon className="w-7 h-7" />
                            </button>
                        )}
                    </div>

                    {view === 'dashboard' ? <DashboardView /> : (
                        <>
                             <div ref={chatboxRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs md:max-w-md lg:max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                            <p className="whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="max-w-xs px-4 py-2 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex items-center">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Ask ECO a question..."
                                    className="flex-1 p-2 border border-slate-300 rounded-l-md focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                    disabled={isLoading}
                                />
                                <button type="submit" className="bg-teal-500 text-white p-2 rounded-r-md hover:bg-teal-600 disabled:bg-slate-400" disabled={isLoading}>
                                    <PaperAirplaneIcon className="w-6 h-6" />
                                </button>
                            </form>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default EcoChatbot;