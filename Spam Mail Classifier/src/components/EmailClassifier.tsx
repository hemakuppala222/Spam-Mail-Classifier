import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Copy, RotateCcw, Send } from 'lucide-react';
import { analyzeEmail } from '../utils/spamDetector';
import { ClassificationResult } from '../types';
import ResultDisplay from './ResultDisplay';
import KeywordList from './KeywordList';

const EmailClassifier: React.FC = () => {
  const [email, setEmail] = useState('');
  const [threshold, setThreshold] = useState(5);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<{email: string, result: ClassificationResult}[]>([]);

  const handleAnalyze = () => {
    if (!email.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate processing time for UX
    setTimeout(() => {
      const analysisResult = analyzeEmail(email, threshold);
      setResult(analysisResult);
      setHistory(prev => [...prev, {email, result: analysisResult}].slice(-5));
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleReset = () => {
    setEmail('');
    setResult(null);
  };

  const handleCopyResult = () => {
    if (!result) return;
    
    const resultText = `
Email Classification Result:
Classification: ${result.isSpam ? 'POTENTIAL SPAM' : 'LIKELY LEGITIMATE'}
Spam Score: ${result.score}/${threshold} (Threshold: ${threshold})
Matched Keywords: ${result.matchedKeywords.join(', ')}
    `.trim();
    
    navigator.clipboard.writeText(resultText);
  };

  const handleSampleClick = (sample: string) => {
    setEmail(sample);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <label htmlFor="email-input" className="block text-sm font-medium text-slate-700 mb-2">
          Enter email content to analyze
        </label>
        <textarea
          id="email-input"
          className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
          placeholder="Paste email content here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 py-1 px-2 rounded transition-colors"
            onClick={() => handleSampleClick("Dear Customer, Congratulations! You've WON our exclusive lottery worth $5,000,000! To claim your FREE prize, click here now! Limited time offer!")}
          >
            Sample Spam
          </button>
          <button
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 py-1 px-2 rounded transition-colors"
            onClick={() => handleSampleClick("Hi team, Just following up on our meeting from yesterday. I've attached the document we discussed with the quarterly figures. Let me know if you have any questions. Thanks, Sarah")}
          >
            Sample Legitimate
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="threshold" className="block text-sm font-medium text-slate-700 mb-2">
          Spam threshold: {threshold} {threshold === 1 ? 'match' : 'matches'}
        </label>
        <input
          type="range"
          id="threshold"
          min="1"
          max="15"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Sensitive (1)</span>
          <span>Balanced (5)</span>
          <span>Lenient (15)</span>
        </div>
      </div>
      
      <div className="flex gap-3 mb-8">
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing || !email.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            isAnalyzing || !email.trim() 
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Analyzing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze Email
            </>
          )}
        </button>
        
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-md font-medium hover:bg-slate-300 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
      
      {result && (
        <div className="mb-6 border border-slate-200 rounded-lg overflow-hidden">
          <div className={`p-4 ${result.isSpam ? 'bg-red-50' : 'bg-green-50'}`}>
            <div className="flex items-center gap-3 mb-2">
              {result.isSpam ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <h3 className={`font-semibold ${result.isSpam ? 'text-red-700' : 'text-green-700'}`}>
                {result.isSpam ? 'Potential Spam Detected' : 'Likely Legitimate Email'}
              </h3>
              <button 
                onClick={handleCopyResult}
                className="ml-auto text-slate-500 hover:text-slate-700"
                title="Copy result"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            
            <ResultDisplay result={result} threshold={threshold} />
          </div>
          
          <div className="p-4 bg-white">
            <h4 className="font-medium text-slate-700 mb-3">Matched Keywords & Patterns</h4>
            <KeywordList keywords={result.matchedKeywords} />
          </div>
        </div>
      )}
      
      {history.length > 0 && !result && (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-100 px-4 py-3">
            <h3 className="text-sm font-medium text-slate-700">Recent Analysis History</h3>
          </div>
          <div className="divide-y divide-slate-200">
            {history.slice().reverse().map((item, index) => (
              <div key={index} className="p-3 hover:bg-slate-50 cursor-pointer" onClick={() => setEmail(item.email)}>
                <div className="flex items-center gap-2">
                  {item.result.isSpam ? (
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  )}
                  <div className="text-sm truncate flex-grow">
                    {item.email.substring(0, 60)}
                    {item.email.length > 60 ? '...' : ''}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.result.isSpam 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {item.result.score}/{threshold}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailClassifier;