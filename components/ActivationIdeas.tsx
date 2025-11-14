
import React from 'react';
import Card from './Card';
import { GiftIcon, HashtagIcon, BuildingStorefrontIcon, BeakerIcon } from './IconComponents';

const ideas = [
  {
    icon: <GiftIcon className="w-10 h-10 text-white" />,
    title: "ReCup Pop-Up Booth",
    description: "Distribute info, sell NU-Q mugs, and give mini rewards like stickers or cupcakes to engage the community directly.",
    bgColor: "bg-teal-500"
  },
  {
    icon: <HashtagIcon className="w-10 h-10 text-white" />,
    title: "ReCup Challenge",
    description: "Encourage social sharing by having participants post photos with their reusable cups using #ReCupNUQ for a chance to win prizes.",
    bgColor: "bg-cyan-500"
  },
  {
    icon: <BuildingStorefrontIcon className="w-10 h-10 text-white" />,
    title: "Campus Store Collab",
    description: "Partner with the campus store to sell limited-edition NU-Q reusable mugs, promoted with a small photoshoot.",
    bgColor: "bg-sky-500"
  },
  {
    icon: <BeakerIcon className="w-10 h-10 text-white" />,
    title: "Café Partnership",
    description: "Collaborate with a local café or vendor for a one-day booth serving coffee in reusable mugs to create great visual content.",
    bgColor: "bg-indigo-500"
  }
];

const ActivationIdeas: React.FC = () => {
  return (
    <section id="ideas" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Big Ideas</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Engaging events and collaborations to bring our campaign to life.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {ideas.map((idea, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex items-start p-6">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${idea.bgColor}`}>
                  {idea.icon}
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-slate-800">{idea.title}</h3>
                  <p className="mt-2 text-slate-600">{idea.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivationIdeas;