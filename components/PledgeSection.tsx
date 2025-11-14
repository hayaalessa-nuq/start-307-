import React from 'react';

interface PledgeSectionProps {
  pledgeCount: number;
  hasPledged: boolean;
  onPledge: () => void;
}

const PledgeSection: React.FC<PledgeSectionProps> = ({ pledgeCount, hasPledged, onPledge }) => {
  return (
    <section id="pledge" className="py-16 md:py-24 bg-teal-600 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Take the Pledge</h2>
        <p className="mt-4 text-lg text-teal-100 max-w-2xl mx-auto">
          Commit to using a reusable cup and help us reach our goal of 50 pledges. Your small change makes a big impact.
        </p>
        <div className="mt-10 max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-5xl font-extrabold text-teal-600 mb-4">{pledgeCount}</div>
                <div className="text-xl font-semibold text-slate-700 mb-6">Pledges Made</div>
                <button
                    onClick={onPledge}
                    disabled={hasPledged}
                    className={`w-full px-8 py-4 text-lg font-bold text-white rounded-lg transition-transform transform duration-150 ease-in-out
                        ${hasPledged 
                            ? 'bg-teal-300 cursor-not-allowed' 
                            : 'bg-teal-500 hover:bg-teal-600 active:scale-95'}`}
                >
                    {hasPledged ? "Thanks for Pledging! 🎉" : "I Pledge to ReCup!"}
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PledgeSection;