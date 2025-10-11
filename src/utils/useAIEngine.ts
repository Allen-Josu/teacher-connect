import { useState, useEffect } from 'react';
import { CreateMLCEngine } from '@mlc-ai/web-llm';
import { knowledgeBase } from './knowledge';  // Adjust path

const SELECTED_MODEL = 'gemma-2-2b-it-q4f16_1-MLC';

export const useAIEngine = () => {
  const [engine, setEngine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<string>('');

  useEffect(() => {
    const initEngine = async () => {
      try {
        const initProgressCallback = (p: any) => setProgress(p.text || p.runtimeStats || '');
        const e = await CreateMLCEngine(SELECTED_MODEL, { initProgressCallback });
        setEngine(e);
        setLoading(false);
      } catch (err) {
        console.error('WebLLM Init Error:', err);
        setProgress(`Error: ${err.message}. Ensure WebGPU support in browser.`);
        setLoading(false);
      }
    };
    initEngine();
  }, []);

  const retrieveContext = (query: string): string => {
    const relevantChunks = new Set<string>();
    const lowerQuery = query.toLowerCase();
    const queryTokens = lowerQuery.split(/\s+/).filter(w => w.length > 3);
    knowledgeBase.forEach(item => {
      const lowerContent = item.content.toLowerCase();
      if (queryTokens.some(token => lowerContent.includes(token))) {
        relevantChunks.add(item.content);
      }
    });
    return Array.from(relevantChunks).join('\n---\n');
  };

  return { engine, loading, progress, retrieveContext };
};