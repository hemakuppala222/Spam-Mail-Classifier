import React from 'react';

interface KeywordListProps {
  keywords: string[];
}

const KeywordList: React.FC<KeywordListProps> = ({ keywords }) => {
  if (keywords.length === 0) {
    return <p className="text-sm text-slate-500">No spam keywords detected</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <span 
          key={index} 
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordList;