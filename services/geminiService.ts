import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

/**
 * Generates a transcript by searching for the video's content online.
 * @param youtubeUrl The URL of the YouTube video.
 * @returns An object containing the generated transcript and the sources used.
 */
export const generateTranscriptFromUrl = async (youtubeUrl: string): Promise<{ transcript: string, sources: any[] }> => {
  const prompt = `You are an expert at finding and creating podcast transcripts from YouTube videos. A user has provided a YouTube URL.
Using Google Search, find the content, subtitles, or a detailed summary of the video at the given URL.
Based on your search results, construct a comprehensive and accurate transcript of the video.
If you cannot find a direct transcript, create a plausible and detailed transcript based on the video's title, description, and any summaries you find.
Respond ONLY with the transcript text itself, without any introduction or explanation.

YouTube URL:
---
${youtubeUrl}
---
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    return { transcript: response.text, sources };
  } catch (error) {
    console.error("Error generating transcript from URL:", error);
    throw new Error("Failed to generate a transcript using the AI model with search.");
  }
};


/**
 * Translates a given transcript to the target language.
 * @param transcript The full text to be translated.
 * @param language The name of the target language (e.g., "Spanish").
 * @returns A string containing the translated transcript.
 */
export const translateTranscript = async (transcript: string, language: string): Promise<string> => {
  const prompt = `Translate the following podcast transcript into ${language}. Maintain the structure and meaning of the original text. Respond only with the translated text, without any additional commentary or introduction.

Transcript:
---
${transcript}
---
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error translating transcript:", error);
    throw new Error("Failed to translate transcript using the AI model.");
  }
};

/**
 * Generates a concise summary of a given transcript.
 * @param transcript The full text to be summarized.
 * @param language The target language for the summary.
 * @returns A string containing the summary.
 */
export const summarizeTranscript = async (transcript: string, language: string): Promise<string> => {
  const prompt = `You are an expert podcast summarizer. Your task is to create a concise, easy-to-read summary of the provided transcript. The summary should capture the main topics, key points, and conclusions. The final output must be in ${language}.

Transcript:
---
${transcript}
---
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing transcript:", error);
    throw new Error("Failed to generate summary from the AI model.");
  }
};

/**
 * Answers a user's question based on a provided context (e.g., a summary).
 * @param context The text context (summary or transcript) the AI should use to find the answer.
 * @param question The user's question.
 * @param language The target language for the answer.
 * @returns A string containing the answer.
 */
export const answerQuestion = async (context: string, question: string, language: string): Promise<string> => {
  const prompt = `You are a helpful AI assistant. Based ONLY on the following context, answer the user's question. 
If the answer is not found within the context, state that you cannot find the answer in the provided text.
The final answer must be in ${language}.

Context:
---
${context}
---

Question:
${question}
`;
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error answering question:", error);
    throw new Error("Failed to get an answer from the AI model.");
  }
};