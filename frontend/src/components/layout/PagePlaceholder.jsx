import React from 'react';

const PagePlaceholder = ({ title }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy">{title}</h1>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[500px] flex items-center justify-center">
      <div className="text-slate-400 text-center">
        <h2 className="text-lg font-medium">{title} Page</h2>
        <p className="text-sm mt-2">Content is under construction.</p>
      </div>
    </div>
  </div>
);

export default PagePlaceholder;
