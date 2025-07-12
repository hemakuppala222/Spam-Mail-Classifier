import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SpamGuard Email Classifier • Rule-Based Detection System
        </p>
        <p className="text-xs mt-2 text-slate-400">
          This tool uses pattern matching to identify potential spam. Results should be verified by human review.
        </p>
      </div>
    </footer>
  );
};

export default Footer;