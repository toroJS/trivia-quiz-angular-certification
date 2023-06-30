import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/Quiz';
import { TriviaService } from 'src/app/services/trivia.service';

enum Status {
  RED = 'red',
  YELLOW = 'yellow',
  GREEN = 'green',
}

interface Score {
  correctQuestions: number;
  totalQuestions: number;
  status: Status;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  questions: Quiz[] = [];
  score: Score = {
    correctQuestions: 0,
    totalQuestions: 0,
    status: Status.RED,
  };
  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit(): void {
    this.questions = this.triviaService.quiz;
    if (this.questions.length < 1) this.router.navigate(['/quiz-generator']);
    this.calculateScore();
  }

  calculateScore() {
    this.score.totalQuestions = this.questions.length;
    this.score.correctQuestions = this.questions.filter(
      (question) => question.selectedOption === question.correctAnswer
    ).length;

    this.score.status = this.getStatus();
  }

  getStatus(): Status {
    switch (this.score.correctQuestions) {
      case 0:
        return Status.RED;
      case 1:
        return Status.RED;
      case 2:
        return Status.YELLOW;
      case 3:
        return Status.YELLOW;
      case 4:
        return Status.GREEN;
      case 5:
        return Status.GREEN;

      default:
        return Status.RED;
    }
  }
}
