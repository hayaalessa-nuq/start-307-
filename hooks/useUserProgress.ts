import { useState, useEffect, useCallback } from 'react';
import type { Challenge, Badge } from '../types';
import { getAIResponse } from '../services/geminiService';

const MILESTONES = [1, 5, 10, 25, 50, 100];

export const useUserProgress = () => {
    const [userLogCount, setUserLogCount] = useState(0);
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [badges, setBadges] = useState<Badge[]>([]);
    const [hasPledged, setHasPledged] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const loadState = useCallback(() => {
        const userPledged = localStorage.getItem('hasPledged') === 'true';
        setHasPledged(userPledged);

        const loggedCount = parseInt(localStorage.getItem('userLogCount') || '0', 10);
        setUserLogCount(loggedCount);

        try {
            const storedChallenge = localStorage.getItem('userChallenge');
            if (storedChallenge) setChallenge(JSON.parse(storedChallenge));

            const storedBadges = localStorage.getItem('userBadges');
            if (storedBadges) setBadges(JSON.parse(storedBadges));
        } catch (error) {
            console.error("Failed to parse user progress from localStorage", error);
        }
    }, []);

    // Load initial state from localStorage
    useEffect(() => {
        loadState();
        
        // Listen for storage events to sync across components/tabs
        window.addEventListener('storage', loadState);
        return () => {
            window.removeEventListener('storage', loadState);
        };
    }, [loadState]);

    const checkAndAwardBadges = useCallback(async (currentCount: number) => {
        const milestone = MILESTONES.find(m => m === currentCount);
        
        // Use a functional update to get the latest badges state
        setBadges(prevBadges => {
            if (milestone && !prevBadges.some(b => b.milestone === milestone)) {
                const prompt = `A user just saved their ${milestone}th reusable cup. Generate a creative, 2-word badge name for this. Examples: "Eco Starter", "Refill Royalty". Just return the name, no extra text.`;
                const systemInstruction = `You are an AI that creates cool names for achievement badges in a sustainability app.`;
                
                // Fire and forget the async operation
                getAIResponse(prompt, systemInstruction).then(badgeName => {
                    const newBadge: Badge = { name: badgeName.trim(), milestone };
                    // Update state and localStorage inside the async callback
                    setBadges(currentBadges => {
                        const updatedBadges = [...currentBadges, newBadge];
                        localStorage.setItem('userBadges', JSON.stringify(updatedBadges));
                        return updatedBadges;
                    });
                });
            }
            return prevBadges; // Return previous state if no new badge
        });
    }, []);

    const generateNewChallenge = useCallback(async () => {
        setIsGenerating(true);
        const currentLogCount = parseInt(localStorage.getItem('userLogCount') || '0', 10);
        const oldChallengeGoal = challenge ? challenge.goal : 3;
        const goal = Math.max(5, oldChallengeGoal + 2); // Start with 5, then increase

        const prompt = `A user has saved ${currentLogCount} cups. Their next goal is to save ${goal} more cups. Create a short, fun, motivational challenge description. Start with "Your Smart Sip Challenge:". Example: "Your Smart Sip Challenge: Save 5 more cups to become a campus hero! 💪". Keep it under 20 words.`;
        const systemInstruction = `You are an AI for a sustainability app. You generate personalized, encouraging challenges for users.`;
        const description = await getAIResponse(prompt, systemInstruction);

        const newChallenge: Challenge = {
            goal,
            description,
            startCount: currentLogCount
        };
        setChallenge(newChallenge);
        localStorage.setItem('userChallenge', JSON.stringify(newChallenge));
        setIsGenerating(false);
    }, [challenge]);


    const logCup = useCallback(() => {
        const newCount = userLogCount + 1;
        setUserLogCount(newCount);
        localStorage.setItem('userLogCount', newCount.toString());
        checkAndAwardBadges(newCount);
        // Dispatch storage event to notify other components
        window.dispatchEvent(new Event('storage'));
    }, [userLogCount, checkAndAwardBadges]);

    return {
        userLogCount,
        challenge,
        badges,
        hasPledged,
        isGenerating,
        logCup,
        generateNewChallenge,
    };
};
