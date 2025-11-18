'use server';

/**
 * @fileOverview An AI agent that provides personalized property investment suggestions based on user's financial goals, risk tolerance and investment history.
 *
 * - getPersonalizedInvestmentSuggestions - A function that handles the personalized investment suggestion process.
 * - PersonalizedInvestmentSuggestionsInput - The input type for the getPersonalizedInvestmentSuggestions function.
 * - PersonalizedInvestmentSuggestionsOutput - The return type for the getPersonalizedInvestmentSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedInvestmentSuggestionsInputSchema = z.object({
  financialGoals: z
    .string()
    .describe("The user's financial goals, e.g., retirement, saving for a down payment, etc."),
  riskTolerance: z
    .string()
    .describe("The user's risk tolerance, e.g., conservative, moderate, aggressive."),
  investmentHistory: z
    .string()
    .describe("A summary of the user's past investment history."),
});
export type PersonalizedInvestmentSuggestionsInput = z.infer<
  typeof PersonalizedInvestmentSuggestionsInputSchema
>;

const PersonalizedInvestmentSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of personalized property investment suggestions.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the investment suggestions.'),
});
export type PersonalizedInvestmentSuggestionsOutput = z.infer<
  typeof PersonalizedInvestmentSuggestionsOutputSchema
>;

export async function getPersonalizedInvestmentSuggestions(
  input: PersonalizedInvestmentSuggestionsInput
): Promise<PersonalizedInvestmentSuggestionsOutput> {
  return personalizedInvestmentSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedInvestmentSuggestionsPrompt',
  input: {schema: PersonalizedInvestmentSuggestionsInputSchema},
  output: {schema: PersonalizedInvestmentSuggestionsOutputSchema},
  prompt: `You are an AI investment advisor specializing in property investments.

  Based on the user's financial goals, risk tolerance, and investment history, provide personalized property investment suggestions.

  Financial Goals: {{{financialGoals}}}
  Risk Tolerance: {{{riskTolerance}}}
  Investment History: {{{investmentHistory}}}

  Consider various property types, locations, and investment levels.
  Explain your reasoning for each suggestion.

  Return the suggestions as a list and the reasoning as a string.
  `,
});

const personalizedInvestmentSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedInvestmentSuggestionsFlow',
    inputSchema: PersonalizedInvestmentSuggestionsInputSchema,
    outputSchema: PersonalizedInvestmentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
