import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, Observable, tap } from 'rxjs';
import { TriviaCategorie } from 'src/app/models/TriviaCategorie';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-quiz-generator',
  templateUrl: './quiz-generator.component.html',
  styleUrls: ['./quiz-generator.component.scss'],
})
export class QuizGeneratorComponent implements OnInit {
  public categories$: Observable<TriviaCategorie[]> =
    this.triviaService.triviaCategories;

  public difficultyOptions = this.triviaService.getDifficultyOptions();

  public showQuiz = false;
  public loading$ = this.triviaService.loading;

  generateQuizForm = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    difficulty: new FormControl(null, [Validators.required]),
  });

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {}

  public createQuiz() {
    this.showQuiz = false;
    const category = this.generateQuizForm.controls.category.value;
    const difficulty = this.generateQuizForm.controls.difficulty.value;

    if (!category || !difficulty) return;

    this.triviaService
      .createQuiz(category, difficulty)
      .pipe(first())
      .subscribe((res) => {
        this.showQuiz = true;
      });
  }
}
