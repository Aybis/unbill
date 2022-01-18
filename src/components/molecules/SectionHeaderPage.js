import React from 'react';

export default function SectionHeaderPage({ title, subtitle }) {
  return (
    <div className="relative p-4 lg:py-8 lg:p-0">
      <div className="mx-auto max-w-md lg:max-w-7xl flex">
        {/* tagline */}
        <div className="relative">
          <h1 className="text-xl font-light text-simakins-heading">
            {subtitle}
          </h1>
          <h1 className="lg:text-3xl text-2xl font-bold text-simakins-heading capitalize">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
