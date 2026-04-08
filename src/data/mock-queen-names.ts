export interface QueenSuggestion {
  id: number;
  name: string;
  votes: number;
}

export const MOCK_SUGGESTIONS: QueenSuggestion[] = [
  { id: 1, name: 'Empress Honeydew', votes: 12 },
  { id: 2, name: 'Queen Cleopollen', votes: 9 },
  { id: 3, name: 'Lady Buzzworth', votes: 7 },
  { id: 4, name: 'Duchess Nectar', votes: 6 },
  { id: 5, name: 'Madame Hivemind', votes: 4 },
  { id: 6, name: 'Another', votes: 3 },
];

export const USER_SUBMITTED_NAME = 'Queen Sting';
export const MAX_VOTES = 3;
export const WINNER = MOCK_SUGGESTIONS[0];
