'use server';
/**
 * @fileOverview Analyzes user profile and meal logs to identify potential nutrient deficiencies and provides personalized recommendations.
 *
 * - aiDeficiencyDetection - A function that analyzes user data to detect deficiencies.
 * - AIDeficiencyDetectionInput - The input type for the aiDeficiencyDetection function.
 * - AIDeficiencyDetectionOutput - The return type for the aiDeficiencyDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDeficiencyDetectionInputSchema = z.object({
  profile: z
    .string()
    .describe('User profile including age, weight, height, gender, health issues (e.g., anemia, vitamin D deficiency), and preferred diet (e.g., Vegetarian).'),
  mealLogs: z.string().describe('User meal logs including Indian food items (e.g., roti, dal, paneer) and portion sizes.'),
});


const AIDeficiencyDetectionOutputSchema = z.object({
  deficiencies: z
    .string()
    .describe('Identified nutrient deficiencies based on the user profile and meal logs, with a focus on common Indian dietary patterns.'),
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations to address the identified nutrient deficiencies, suggesting locally available Indian food items.'
    ),
});


export async function aiDeficiencyDetection(input) {
  return aiDeficiencyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDeficiencyDetectionPrompt',
  input: {schema: AIDeficiencyDetectionInputSchema},
  output: {schema: AIDeficiencyDetectionOutputSchema},
  prompt: `You are a registered dietician specializing in Indian nutrition. You need to identify nutrient deficiencies and provide personalized dietary recommendations for an Indian user.

  Based on the user's profile and their meal logs (which consist of Indian dishes), analyze their nutrient intake and identify potential deficiencies.
  Provide personalized recommendations to address these deficiencies, suggesting easily available Indian food items. Consider common health issues in India like anemia and vitamin D deficiency.

  User Profile: {{{profile}}}
  Meal Logs: {{{mealLogs}}}

  Ensure that the recommendations are practical, culturally appropriate, and sustainable for someone following an Indian diet.
  Highlight the importance of a balanced diet and an active lifestyle for overall well-being.
`,
});

const aiDeficiencyDetectionFlow = ai.defineFlow(
  {
    name: 'aiDeficiencyDetectionFlow',
    inputSchema: AIDeficiencyDetectionInputSchema,
    outputSchema: AIDeficiencyDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
