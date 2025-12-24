import React from 'react';
import { PremiumLayout } from './components/Layout/PremiumLayout';
import { Hero } from './components/UI/Hero';
import { PainPoints } from './components/UI/PainPoints';
import { Solution } from './components/UI/Solution';

function App() {
  return (
    <PremiumLayout>
      <Hero />
      <PainPoints />
      <Solution />

      {/* Contact / Final CTA Section */}
      <section id="contact" className="py-32 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
          Ready to elevate your business?
        </h2>
        <p className="text-white/50 max-w-xl mb-10">
          Join the leaders who have already automated their way to success.
        </p>
        <div className="p-[1px] rounded-full bg-gradient-to-r from-transparent via-gold-400 to-transparent w-full max-w-sm" />
      </section>

    </PremiumLayout>
  );
}

export default App;
