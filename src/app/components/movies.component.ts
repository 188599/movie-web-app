import { Component, OnDestroy, OnInit } from "@angular/core";
import { Movie } from "../interfaces/movie.interface";
import { MoviesService } from "../services/movies.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject, takeUntil, tap } from "rxjs";

@Component({
    template: `
        <mat-grid-list [cols]="cols" [rowHeight]="rowHeight">
            <mat-grid-tile *ngFor="let movie of moviesList" class="grid-tile">
                <mat-card class="movie-card" #movieCard [routerLink]="['/movie', movie.id]">
                    <mat-card-header>
                        <mat-card-title> {{ movie.title }} </mat-card-title>
                    </mat-card-header>

                    <mat-card-content>
                        <img class="movie-thumbnail" mat-card-image [src]="movie.thumbnail" [alt]="movie.title">

                        <table class="description-rating-table">
                            <tr>
                                <td valign="top">
                                    <p class="movie-description"> {{ movie.description }} </p>
                                </td>
                            </tr>

                            <tr>
                                <td valign="bottom">
                                    <p class="movie-rating"> 
                                        Rating: {{ movie.rating }}

                                    </p>
                                </td>
                            </tr>
                        </table>
                    </mat-card-content>
                </mat-card>
            </mat-grid-tile>
        </mat-grid-list>
    `,
    styles: [`
        .movie-card {
            height: 18rem;
            width: 30rem;
            cursor: pointer !important;
        }

        .movie-thumbnail {
            height: 12.5rem;
            float: left;
            margin-top: 0.5rem;
            margin-inline-end: 10px;
        }

        .movie-description {
            text-align: justify;
            text-justify: inter-word;
        }

        .description-rating-table {
            height: 100%;
            border-collapse: collapse;
        }
        
    `]
})
export class MoviesComponent implements OnInit, OnDestroy {

    public moviesList!: Movie[];

    public cols!: number;

    public rowHeight!: string;

    private gridByBreakpoint = {
        [Breakpoints.XLarge]: { cols: 4, rowHeight: '2:1.2' },
        [Breakpoints.Large]: { cols: 3, rowHeight: '2:1.4' },
        [Breakpoints.Medium]: { cols: 2, rowHeight: '2:1' },
        [Breakpoints.Small]: { cols: 1, rowHeight: '2:0.9' },
        [Breakpoints.XSmall]: { cols: 1, rowHeight: '2:1.2' }
    }

    private onDestroy$ = new Subject<void>();

    constructor(
        breakpointObserver: BreakpointObserver,
        private moviesService: MoviesService
    ) {
        breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge,
        ])
            .pipe(
                tap(result => {
                    if (result.matches) {
                        const [breakpoint] = Object.entries(result.breakpoints)
                            .find(([, matches]) => matches)!;

                        const { cols, rowHeight } = this.gridByBreakpoint[breakpoint];

                        this.cols = cols, this.rowHeight = rowHeight;
                    }
                }),

                takeUntil(this.onDestroy$)
            )
            .subscribe();
    }


    public ngOnInit() {
        this.moviesList = this.moviesService.getMovies();
    }

    public ngOnDestroy() {
        this.onDestroy$.next();
    }

}