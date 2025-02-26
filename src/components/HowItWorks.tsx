'use client';

import { Search, BookOpen, Users } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find Books',
    description: 'AI suggests books based on your interests and reading history',
  },
  {
    icon: BookOpen,
    title: 'Write Reviews',
    description: 'Share your thoughts via text, audio, or video reviews',
  },
  {
    icon: Users,
    title: 'Join Clubs',
    description: 'Discuss books with like-minded readers in book clubs',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community and start your reading journey in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 