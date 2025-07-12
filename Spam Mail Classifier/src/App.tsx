import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import EmailClassifier from './components/EmailClassifier';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 bg-slate-800 text-white">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-emerald-400" />
                <h2 className="text-xl font-bold">Spam Email Classifier</h2>
              </div>
              <p className="text-slate-300">
                Analyze emails to detect potential spam using keyword pattern matching
              </p>
            </div>
            <EmailClassifier />
          </div>
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-800">How It Works</h3>
            </div>
            <p className="text-slate-600 mb-4">
              This classifier scans email content for specific patterns and keywords commonly 
              found in spam messages (like "free", "win", "money", "limited time", etc.).
            </p>
            <p className="text-slate-600">
              The system counts the occurrences of these suspicious patterns and calculates
              a spam probability score. If the score exceeds the threshold, the email is 
              classified as potential spam.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;