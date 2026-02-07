'use client';

import React from 'react';

interface AboutCoinProps {
  name: string;
  description: string;
}

const AboutCoin = ({ name, description }: AboutCoinProps) => {
  return (
    <section className="bg-gray-900/50 p-8 rounded-[2rem] border border-gray-800/50 shadow-2xl backdrop-blur-sm h-full">
      <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
        About {name}
        <div className="h-px flex-1 bg-gray-800" />
      </h2>
      <div
        className="text-gray-400 font-medium leading-relaxed prose prose-invert max-w-none prose-p:text-gray-400 prose-a:text-purple-400"
        dangerouslySetInnerHTML={{
          __html: description || `No description available for ${name}.`,
        }}
      />
    </section>
  );
};

export default AboutCoin;
