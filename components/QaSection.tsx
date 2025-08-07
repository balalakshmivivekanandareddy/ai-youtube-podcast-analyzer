
import React from 'react';
import { SendIcon } from './IconComponents';

interface QaSectionProps {
  question: string;
  setQuestion: (q: string) => void;
  answer: string | null;
  onSubmit: () => void;
  isAsking: boolean;
}

export const QaSection: React.FC<QaSectionProps> = ({ question, setQuestion, answer, onSubmit, isAsking }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Ask a Question</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What is a qubit?"
          disabled={isAsking}
          className="flex-grow bg-gray-900 border border-gray-600 rounded-lg text-white px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
        <button
          type="submit"
          disabled={isAsking || !question.trim()}
          className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors"
        >
          {isAsking ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </button>
      </form>
      
      {(isAsking || answer) && (
        <div className="pt-4">
          <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700">
            {isAsking && !answer && (
              <p className="text-gray-400 animate-pulse">Thinking...</p>
            )}
            {answer && (
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{answer}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
