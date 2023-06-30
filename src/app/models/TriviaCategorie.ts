export interface TriviaCategorie {
  id: number;
  name: string;
}

export interface CategorieApiResponse {
  trivia_categories: TriviaCategorie[];
}
