import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-amber-400" />
          <h1 className="text-xl font-bold">SpamGuard</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li className="text-sm text-slate-300 hover:text-white transition-colors">
              <a href="#" className="flex items-center gap-1">Classifier</a>
            </li>
            <li className="text-sm text-slate-300 hover:text-white transition-colors">
              <a href="#" className="flex items-center gap-1">Documentation</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;