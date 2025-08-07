
import React from 'react';
import { SparklesIcon, YoutubeIcon } from './IconComponents';

interface UrlInputFormProps {
  url: string;
  setUrl: (url: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  languages: { code: string; name: string }[];
  onSubmit: () => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ url, setUrl, language, setLanguage, languages, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-300 mb-2">
            YouTube Video URL
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <YoutubeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="youtube-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Choose a Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            disabled={isLoading}
            className="w-full py-2 px-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300"
        >
          {isLoading ? (
            'Processing...'
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Analyze Video
            </>
          )}
        </button>
      </div>
    </form>
  );
};
