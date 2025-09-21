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
    .describe('User profile including age, weight, height, gender, health issues, and preferred diet.'),
  mealLogs: z.string().describe('User meal logs including food items and portion sizes.'),
});
export type AIDeficiencyDetectionInput = z.infer<typeof AIDeficiencyDetectionInputSchema>;

const AIDeficiencyDetectionOutputSchema = z.object({
  deficiencies: z
    .string()
    .describe('Identified nutrient deficiencies based on the user profile and meal logs.'),
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations to address the identified nutrient deficiencies, tailored to the user\'s health conditions such as obesity.'
    ),
});
export type AIDeficiencyDetectionOutput = z.infer<typeof AIDeficiencyDetectionOutputSchema>;

export async function aiDeficiencyDetection(input: AIDeficiencyDetectionInput): Promise<AIDeficiencyDetectionOutput> {
  return aiDeficiencyDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDeficiencyDetectionPrompt',
  input: {schema: AIDeficiencyDetectionInputSchema},
  output: {schema: AIDeficiencyDetectionOutputSchema},
  prompt: `You are a registered dietician specializing in identifying nutrient deficiencies and providing personalized dietary recommendations.

  Based on the user's profile and meal logs, analyze their current nutrient intake and identify any potential deficiencies.
  Provide personalized recommendations to address these deficiencies, taking into account any health conditions such as obesity.

  User Profile: {{{profile}}}
  Meal Logs: {{{mealLogs}}}

  Ensure that the recommendations are practical and sustainable, focusing on dietary changes that can be easily incorporated into the user's lifestyle.
  Highlight the importance of a balanced diet and regular physical activity for overall health and well-being.
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
    return output!;
  }
);
