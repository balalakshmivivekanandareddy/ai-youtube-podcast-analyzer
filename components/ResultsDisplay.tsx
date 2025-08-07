import React, { useState } from 'react';

interface ResultsDisplayProps {
  summary: string;
  transcript: string;
  sources: any[] | null;
}

const SectionCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
    <h3 className="text-xl font-bold text-white p-4 bg-gray-900/30 border-b border-gray-700">
      {title}
    </h3>
    <div className="p-6">{children}</div>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ summary, transcript, sources }) => {
    const [isTranscriptVisible, setIsTranscriptVisible] = useState(false);

    return (
        <div className="space-y-6">
            <SectionCard title="AI Summary">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{summary}</p>
            </SectionCard>

            {sources && sources.length > 0 && (
                <SectionCard title="Sources">
                    <ul className="space-y-3">
                        {sources.map((source, index) => (
                           source.web?.uri && (
                            <li key={index} className="flex items-start gap-3">
                                <span className="text-indigo-400 mt-1.5 flex-shrink-0">●</span>
                                <div>
                                    <a
                                        href={source.web.uri}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition-colors break-words"
                                    >
                                        {source.web.title || "Untitled Source"}
                                    </a>
                                </div>
                            </li>
                           )
                        ))}
                    </ul>
                </SectionCard>
            )}

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                <button
                    onClick={() => setIsTranscriptVisible(!isTranscriptVisible)}
                    className="w-full flex justify-between items-center text-xl font-bold text-white p-4 bg-gray-900/30 border-b border-gray-700 hover:bg-gray-900/50 transition-colors"
                >
                    <span>Full Transcript</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform ${isTranscriptVisible ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isTranscriptVisible && (
                    <div className="p-6 max-h-96 overflow-y-auto">
                        <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">{transcript}</p>
                    </div>
                )}
            </div>
        </div>
    );
};