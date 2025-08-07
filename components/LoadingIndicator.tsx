
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl">
      <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-indigo-300 font-medium">{message}</p>
    </div>
  );
};
