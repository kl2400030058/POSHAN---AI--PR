'use server';

/**
 * @fileOverview AI meal analysis flow. Analyzes the calories and contents of a meal from an image.
 *
 * - analyzeMeal - Function to analyze a meal.
 * - AnalyzeMealInput - Input type for analyzeMeal function.
 * - AnalyzeMealOutput - Output type for analyzeMeal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMealInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a meal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});


const AnalyzeMealOutputSchema = z.object({
  calories: z.number().describe('The estimated calorie count of the meal.'),
  contents: z
    .string()
    .describe('A description of the contents of the meal, recognizing Indian dishes if present.'),
});


export async function analyzeMeal(input) {
  return analyzeMealFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMealPrompt',
  input: {schema: AnalyzeMealInputSchema},
  output: {schema: AnalyzeMealOutputSchema},
  prompt: `You are an expert nutritionist with deep knowledge of Indian cuisine. You will analyze the image of the meal and provide an estimate of the calorie count and a description of the contents of the meal. Be specific about identifying Indian food items.

Analyze the following meal:
{{media url=photoDataUri}}`,
});

const analyzeMealFlow = ai.defineFlow(
  {
    name: 'analyzeMealFlow',
    inputSchema: AnalyzeMealInputSchema,
    outputSchema: AnalyzeMealOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
