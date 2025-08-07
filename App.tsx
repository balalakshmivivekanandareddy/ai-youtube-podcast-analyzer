import React, { useState, useCallback } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ResultsDisplay } from './components/ResultsDisplay';
import { QaSection } from './components/QaSection';
import { SparklesIcon, YoutubeIcon } from './components/IconComponents';
import { LANGUAGES } from './constants';
import { summarizeTranscript, answerQuestion, translateTranscript, generateTranscriptFromUrl } from './services/geminiService';

type LoadingStage = 'Downloading Audio...' | 'Analyzing Content...' | 'Researching & Generating Transcript...' | 'Translating...' | 'Summarizing...' | '';

const App: React.FC = () => {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('en');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<LoadingStage>('');
  const [error, setError] = useState<string | null>(null);

  const [summary, setSummary] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [sources, setSources] = useState<any[] | null>(null);

  const [qaQuestion, setQaQuestion] = useState<string>('');
  const [qaAnswer, setQaAnswer] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState<boolean>(false);
  
  const resetState = () => {
    setError(null);
    setSummary(null);
    setTranscript(null);
    setSources(null);
    setQaQuestion('');
    setQaAnswer(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!youtubeUrl) {
      setError('Please enter a valid YouTube URL.');
      return;
    }
    resetState();
    setIsLoading(true);

    try {
      setLoadingMessage('Downloading Audio...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setLoadingMessage('Analyzing Content...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setLoadingMessage('Researching & Generating Transcript...');
      const { transcript: fetchedTranscript, sources: fetchedSources } = await generateTranscriptFromUrl(youtubeUrl);
      let processedTranscript = fetchedTranscript;

      const languageInfo = LANGUAGES.find(l => l.code === targetLanguage);
      const languageName = languageInfo?.name || 'the selected language';
      
      // Translate if target language is not English
      if (languageInfo && languageInfo.code !== 'en') {
          setLoadingMessage('Translating...');
          processedTranscript = await translateTranscript(fetchedTranscript, languageName);
      }

      setLoadingMessage('Summarizing...');
      // Summarize from the (potentially translated) transcript
      const generatedSummary = await summarizeTranscript(processedTranscript, languageName);

      setSummary(generatedSummary);
      setTranscript(processedTranscript);
      setSources(fetchedSources);

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during analysis.';
      setError(`Failed to analyze video. ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [youtubeUrl, targetLanguage]);

  const handleAskQuestion = useCallback(async () => {
    if (!qaQuestion.trim() || !summary) return;

    setIsAsking(true);
    setQaAnswer(null);
    try {
        const languageName = LANGUAGES.find(l => l.code === targetLanguage)?.name || 'the selected language';
        const answer = await answerQuestion(summary, qaQuestion, languageName);
        setQaAnswer(answer);
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setQaAnswer(`Sorry, I couldn't get an answer. ${errorMessage}`);
    } finally {
        setIsAsking(false);
    }
  }, [qaQuestion, summary, targetLanguage]);


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2 flex items-center justify-center gap-3">
            <YoutubeIcon className="w-12 h-12 text-red-500" />
            <span>Podcast Analyzer</span>
            <SparklesIcon className="w-10 h-10 text-indigo-400" />
          </h1>
          <p className="text-lg text-gray-400">
            Turn any YouTube video into a summarized, queryable podcast experience.
          </p>
        </header>
        
        <main className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl">
            <UrlInputForm
              url={youtubeUrl}
              setUrl={setYoutubeUrl}
              language={targetLanguage}
              setLanguage={setTargetLanguage}
              languages={LANGUAGES}
              onSubmit={handleAnalyze}
              isLoading={isLoading}
            />
          </div>

          {isLoading && <LoadingIndicator message={loadingMessage} />}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {summary && transcript && !isLoading && (
            <div className="space-y-6">
              <ResultsDisplay summary={summary} transcript={transcript} sources={sources} />
              <QaSection
                question={qaQuestion}
                setQuestion={setQaQuestion}
                answer={qaAnswer}
                onSubmit={handleAskQuestion}
                isAsking={isAsking}
              />
            </div>
          )}
        </main>
      </div>
      <footer className="text-center text-gray-500 mt-12">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;