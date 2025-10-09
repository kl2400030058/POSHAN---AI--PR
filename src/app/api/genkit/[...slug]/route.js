
// src/app/api/genkit/[...slug]/route.js
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {NextRequest} from 'next/server';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
