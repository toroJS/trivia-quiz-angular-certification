import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, first, map, Observable, tap } from 'rxjs';
import {
  Difficulty,
  Quiz,
  QuizApiResponse,
  QuizParameters,
  QuizQuestion,
  Type,
} from '../models/Quiz';
import {
  CategorieApiResponse,
  TriviaCategorie,
} from '../models/TriviaCategorie';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  constructor(private http: HttpClient) {
    this.getTriviaCategories()
      .pipe(first())
      .subscribe((triviaCategories) =>
        this.triviaCategories$.next(triviaCategories)
      );
  }

  public quiz: Quiz[] = [];
  private triviaCategories$ = new BehaviorSubject<TriviaCategorie[]>([]);
  private loading$ = new BehaviorSubject(false);

  get loading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  get triviaCategories(): Observable<TriviaCategorie[]> {
    return this.triviaCategories$.asObservable();
  }

  private getTriviaCategories(): Observable<TriviaCategorie[]> {
    this.loading$.next(true);
    return this.http
      .get<CategorieApiResponse>('https://opentdb.com/api_category.php')
      .pipe(
        delay(5000),
        tap(() => this.loading$.next(false)),
        map((res: CategorieApiResponse) => res.trivia_categories)
      );
  }

  public getDifficultyOptions(): Difficulty[] {
    return [
      Difficulty.EASY,
      Difficulty.MEDIUM,
      Difficulty.HARD,
    ] as Difficulty[];
  }

  public createQuiz(
    category: number,
    difficulty: Difficulty
  ): Observable<QuizQuestion[]> {
    let testParams = {
      amount: 5,
      category: category,
      difficulty: difficulty,
      type: Type.MULTIPLE,
    } as QuizParameters;

    const httpParams = new HttpParams({ fromObject: { ...testParams } });
    return this.http
      .get<QuizApiResponse>('https://opentdb.com/api.php', {
        params: httpParams,
      })
      .pipe(
        first(),
        map((res: QuizApiResponse) => {
          this.quiz = res.results.map((questionItem) => {
            return {
              question: questionItem.question,
              selectedOption: '',
              correctAnswer: questionItem.correct_answer,
              options: [
                questionItem.correct_answer,
                ...questionItem.incorrect_answers,
              ].sort((a, b) => 0.5 - Math.random()),
            };
          });
          return res.results;
        })
      );
  }

  submitQuiz(answeredQuiz: Quiz[]) {
    this.quiz = answeredQuiz;
  }
}
