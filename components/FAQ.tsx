import React, { useState } from 'react';
import { ChevronDownIcon } from './IconComponents';

const faqData = [
  {
    question: "Why focus on reusable cups?",
    answer: "Single-use cups, even paper ones, are often lined with plastic, making them difficult to recycle. They contribute significantly to landfill waste. Focusing on reusable cups is a simple, high-impact habit that reduces daily waste and our collective carbon footprint."
  },
  {
    question: "I always forget my cup. Any tips?",
    answer: "We get it! Try 'habit stacking': place your reusable cup with your keys, wallet, or backpack the night before. Or, keep a spare cup at your campus office or in your usual study spot. ECO can also send you a friendly reminder if you opt-in!"
  },
  {
    question: "What kind of reusable cup is best?",
    answer: "The best reusable cup is the one you'll use consistently! Whether it's stainless steel, glass, or BPA-free plastic, find one that fits your lifestyle. The key is to use it hundreds of times to maximize its environmental benefit."
  },
  {
    question: "Does my small action really make a difference?",
    answer: "Absolutely! Every time you choose a reusable cup, you prevent one item from entering the waste stream. When hundreds of us do it, the impact becomes massive. Check out our 'Collective Impact' section to see how our small actions add up!"
  },
  {
    question: "Where can I find campaign updates?",
    answer: "Follow us on Instagram @ReCupNUQ for the latest news, challenge announcements, and winner shoutouts. You can also ask our chatbot, ECO, for information about upcoming events!"
  }
];

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-800 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDownIcon
          className={`w-6 h-6 text-teal-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-2' : 'max-h-0'}`}
      >
        <p className="text-slate-600 pt-2">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Common Questions</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Here's what you need to know about the ReCupNUQ campaign.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
          {faqData.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
