import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  template: `
  <mat-drawer-container class="container" #container>
    <mat-drawer-content>
      <mat-toolbar color="primary">
        <span>{{ title }}</span>
      </mat-toolbar>

      <router-outlet></router-outlet>
    </mat-drawer-content>
  </mat-drawer-container>
`,
  styles: [
    `
    .container {
      width: 100%;
      height: 100%;
    }

    mat-toolbar {
      margin-bottom: 20px;
    }
    `
  ]
})
export class AppComponent {

  title = 'Movies';


  constructor(router: Router, moviesService: MoviesService) {
    router.events
      .pipe(
        filter(ev => ev instanceof NavigationEnd),
        map(ev => ev as NavigationEnd),
        tap(({ urlAfterRedirects }) => {
          const id = urlAfterRedirects.match(/\d+$/)?.[0];

          if (id) {
            const movie = moviesService.getMovie(+id);

            if (movie) {
              this.title = movie.title;
            }

            else {
              this.title = 'Movie not found';
            }

            return;
          }

          this.title = 'Movies';
        })
      )
      .subscribe();
  }

}
