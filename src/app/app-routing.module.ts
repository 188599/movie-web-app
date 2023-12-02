import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/movies.component';
import { MovieDetailsComponent } from './components/movie-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies'
  },
  {
    component: MoviesComponent,
    path: 'movies'
  },
  {
    component: MovieDetailsComponent,
    path: 'movie/:id'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
