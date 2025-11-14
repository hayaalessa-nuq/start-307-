
import React from 'react';
import Card from './Card';
import { TargetIcon, CheckCircleIcon, RocketLaunchIcon } from './IconComponents';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Mission</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We're on a mission to reduce single-use cup waste at NU-Q by making reusable cups the new campus norm.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <Card>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <TargetIcon className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">Educate</h3>
              <p className="text-slate-600">
                Informing our community about the environmental impact of single-use cups.
              </p>
            </div>
          </Card>
          <Card>
            <div className="p-6">
               <div className="flex justify-center mb-4">
                <CheckCircleIcon className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">Raise Awareness</h3>
              <p className="text-slate-600">
                Highlighting realistic and accessible sustainability solutions for everyone on campus.
              </p>
            </div>
          </card>
          <Card>
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <RocketLaunchIcon className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-700">Motivate</h3>
              <p className="text-slate-600">
                Inspiring students, faculty, and staff to make the switch to reusable cups.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;