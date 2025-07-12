export interface ClassificationResult {
  isSpam: boolean;
  score: number;
  matchedKeywords: string[];
}

export interface SpamPattern {
  name: string;
  regex: string;
}

export interface SpamCategory {
  name: string;
  keywords: string[];
}