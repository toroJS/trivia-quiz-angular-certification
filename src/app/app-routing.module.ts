import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizGeneratorComponent } from './components/quiz-generator/quiz-generator.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: 'quiz-generator', component: QuizGeneratorComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', redirectTo: '/quiz-generator', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
