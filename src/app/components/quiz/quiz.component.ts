import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz, QuizQuestion } from 'src/app/models/Quiz';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  questions: Quiz[] = [];
  showSubmit = false;

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit(): void {
    this.questions = this.triviaService.quiz;
  }

  selectOption(questionItem: Quiz, option: string) {
    questionItem.selectedOption = option;

    const unselectedQuestion = this.questions.find((question) => {
      return !question.selectedOption;
    });
    if (unselectedQuestion) {
      this.showSubmit = false;
      return;
    }
    this.showSubmit = true;
  }

  submitQuiz() {
    this.triviaService.submitQuiz(this.questions);
    this.router.navigate(['/results']);
  }
}
