// Common keywords found in spam emails
export const spamKeywords: string[] = [
  "free",
  "win",
  "winner",
  "won",
  "congratulations",
  "congrats",
  "prize",
  "claim",
  "money",
  "cash",
  "credit",
  "loan",
  "urgent",
  "act now",
  "limited time",
  "offer expires",
  "exclusive deal",
  "guaranteed",
  "casino",
  "jackpot",
  "lottery",
  "million",
  "dollars",
  "bitcoin",
  "investment",
  "discount",
  "sale",
  "buy now",
  "click here",
  "subscribe",
  "unsubscribe",
  "remove",
  "viagra",
  "pharmacy",
  "medication",
  "pills",
  "cure",
  "enlarge",
  "miracle",
  "weight loss",
  "diet",
  "cheap",
  "save",
  "risk-free",
  "satisfaction",
  "refund",
  "trial"
];

// Pattern matching for common spam techniques
export const spamPatterns = [
  {
    name: "Excessive exclamation marks",
    regex: "!{2,}"
  },
  {
    name: "Excessive capitalization",
    regex: "\\b[A-Z]{4,}\\b"
  },
  {
    name: "Suspicious URLs",
    regex: "bit\\.ly|tinyurl|click\\s*here"
  },
  {
    name: "Money symbols with numbers",
    regex: "[$€£¥]\\s*\\d+,?\\d*"
  },
  {
    name: "Percentages off",
    regex: "\\d+%\\s*off"
  },
  {
    name: "Urgent action required",
    regex: "urgent|immediate|attention|important|alert"
  },
  {
    name: "Request for personal information",
    regex: "confirm.*details|verify.*account|update.*information"
  },
  {
    name: "Lottery/gambling references",
    regex: "lottery|jackpot|prize|winner|casino|bet"
  },
  {
    name: "Too good to be true offers",
    regex: "free\\s*money|easy\\s*cash|get\\s*rich|income\\s*opportunity"
  },
  {
    name: "Suspicious sender domain",
    regex: "@(gmail|yahoo|hotmail|outlook)\\.com"
  }
];

// Categories of spam for more detailed analysis
export const spamCategories = [
  {
    name: "Financial Scams",
    keywords: ["bank", "account", "transfer", "wire", "western union", "moneygram", "transaction"]
  },
  {
    name: "Phishing Attempts",
    keywords: ["verify", "confirm", "update", "login", "password", "security", "unusual activity"]
  },
  {
    name: "Health & Medicine",
    keywords: ["diet", "weight loss", "pills", "medication", "pharmacy", "prescription", "drug"]
  },
  {
    name: "Get Rich Quick",
    keywords: ["make money", "earn", "income", "opportunity", "work from home", "business opportunity"]
  },
  {
    name: "Lottery & Gambling",
    keywords: ["lottery", "winner", "prize", "jackpot", "casino", "bet", "gambling"]
  }
];