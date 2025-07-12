import { ClassificationResult } from '../types';
import { spamKeywords, spamPatterns } from '../data/spamKeywords';

export function analyzeEmail(email: string, threshold: number): ClassificationResult {
  const emailText = email.toLowerCase();
  const matchedKeywords: string[] = [];
  let score = 0;

  // Check for exact keyword matches
  spamKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = emailText.match(regex);
    
    if (matches && matches.length > 0) {
      matchedKeywords.push(keyword);
      score += matches.length;
    }
  });

  // Check for pattern matches
  spamPatterns.forEach(pattern => {
    const regex = new RegExp(pattern.regex, 'gi');
    const matches = emailText.match(regex);
    
    if (matches && matches.length > 0) {
      matchedKeywords.push(pattern.name);
      score += matches.length;
    }
  });

  // Remove duplicates from matched keywords
  const uniqueKeywords = Array.from(new Set(matchedKeywords));

  return {
    isSpam: score >= threshold,
    score,
    matchedKeywords: uniqueKeywords,
  };
}

// Additional helper functions

export function calculateSpamProbability(score: number, threshold: number): number {
  // Simple probability calculation - can be replaced with more sophisticated algorithm
  const probability = Math.min(score / threshold, 1) * 100;
  return Math.round(probability);
}

export function getCommonSpamFeatures(): string[] {
  return [
    "Excessive use of capital letters",
    "Urgency or limited-time offers",
    "Too-good-to-be-true promises",
    "Requests for personal information",
    "Poor grammar and spelling",
    "Suspicious links or attachments",
    "Unsolicited lottery or prize notifications"
  ];
}