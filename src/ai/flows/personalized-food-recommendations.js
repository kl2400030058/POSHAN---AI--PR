'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized food recommendations
 * based on user-specific nutrient deficiencies and health conditions, tailored for an Indian context.
 *
 * The flow takes user profile information, current nutrient intake, and identified deficiencies as input.
 * It then leverages an LLM to generate personalized food recommendations to address these deficiencies,
 * considering the user's health conditions and dietary preferences.
 *
 * - personalizedFoodRecommendations - A function that orchestrates the food recommendation process.
 * - PersonalizedFoodRecommendationsInput - The input type for the personalizedFoodRecommendations function.
 * - PersonalizedFoodRecommendationsOutput - The return type for the personalizedFoodRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the personalized food recommendations flow
const PersonalizedFoodRecommendationsInputSchema = z.object({
  userProfile: z.object({
    age: z.number().describe('The user\u2019s age in years.'),
    weight: z.number().describe('The user\u2019s weight in kilograms.'),
    height: z.number().describe('The user\u2019s height in centimeters.'),
    gender: z.enum(['male', 'female']).describe('The user\u2019s gender.'),
    healthIssues: z.string().describe('Any health issues the user has (e.g., Anemia, Vitamin D deficiency).'),
    preferredDiet: z.string().describe('The user\u2019s preferred diet (e.g., Vegetarian).'),
  }).describe('The user profile information.'),
  nutrientIntake: z.string().describe('The user\u2019s current daily nutrient intake.'),
  identifiedDeficiencies: z.string().describe('The identified nutrient deficiencies of the user.'),
});



// Define the output schema for the personalized food recommendations flow
const PersonalizedFoodRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      foodItem: z.string().describe('The recommended Indian food item.'),
      rationale: z.string().describe('The rationale for recommending this food item, based on the identified deficiencies and health conditions.'),
    })
  ).describe('An array of personalized food recommendations with Indian food items.'),
});



// Exported function to initiate the personalized food recommendations flow
export async function personalizedFoodRecommendations(
  input
) {
  return personalizedFoodRecommendationsFlow(input);
}

// Define the prompt for generating personalized food recommendations
const personalizedFoodRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedFoodRecommendationsPrompt',
  input: {
    schema: PersonalizedFoodRecommendationsInputSchema,
  },
  output: {
    schema: PersonalizedFoodRecommendationsOutputSchema,
  },
  prompt: `You are a registered dietician specializing in Indian nutrition. Provide personalized food recommendations to an Indian user based on their nutrient deficiencies and health conditions.

  Here's the user's profile:
  Age: {{{userProfile.age}}}
  Weight: {{{userProfile.weight}}} kg
  Height: {{{userProfile.height}}} cm
  Gender: {{{userProfile.gender}}}
  Health Issues: {{{userProfile.healthIssues}}}
  Preferred Diet: {{{userProfile.preferredDiet}}}

  Here's the user's current daily nutrient intake:
  {{{nutrientIntake}}}

  Here are the user's identified nutrient deficiencies:
  {{{identifiedDeficiencies}}}

  Based on this information, provide a list of personalized food recommendations using locally available Indian food items. Include a rationale for each recommendation.
  Consider the user's health conditions and preferred diet (e.g., Vegetarian).
  Format the recommendations as a JSON array of objects, where each object has a foodItem and a rationale field.
  `,
});

// Define the Genkit flow for generating personalized food recommendations
const personalizedFoodRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedFoodRecommendationsFlow',
    inputSchema: PersonalizedFoodRecommendationsInputSchema,
    outputSchema: PersonalizedFoodRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedFoodRecommendationsPrompt(input);
    return output;
  }
);
