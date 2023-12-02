import { Component, OnInit } from "@angular/core";
import { Movie } from "../interfaces/movie.interface";
import { ActivatedRoute } from "@angular/router";
import { MoviesService } from "../services/movies.service";

@Component({
    template: `
        <div class="container" *ngIf="!notFound">
            <div class="container-left">
                <img class="movie-thumbnail" [src]="movie?.thumbnail" [alt]="movie?.title">

                <p> <b> Rating</b> </p>

                <p> {{ movie?.rating }} </p>
    
                <p> <b> Release Date </b> </p>

                <p> {{ movie?.releaseDate }} </p>
    
                <p> <b> Duration </b> </p>

                <p> {{ movie?.duration }} </p>

                <p> <b> Genre</b> </p>

                <p> {{ movie?.joinedGenres }} </p>

                <p>
                    <app-watchlist-button [id]="movie!.id"></app-watchlist-button>
                </p>
            </div>
    
            <div class="container-right">
                <mat-card>
                    <mat-card-header>
                        <mat-card-title>
                            {{ movie?.title }}
                        </mat-card-title>

                        <mat-card-subtitle>
                            <p> {{ movie?.description }} </p>
                        </mat-card-subtitle>
                    </mat-card-header>

                    <mat-card-content>
                        <div class="youtube-embed">
                            <p>
                                <iframe [src]='movie?.trailerUrl' frameborder="0" allowfullscreen></iframe>
                            </p>
                        </div>
                    </mat-card-content>
                </mat-card>
            </div>
        </div>
    `,
    styles: [
        `
        .container {
            height: calc(100% - 64px - 2rem);
            width: 60%;
            margin-top: 2rem;
            margin-inline: 20%;
        }

        .container-left {
            width: 20rem;
            float: left;
            height: 100%;

            .movie-thumbnail {
                width: 15rem;
                margin-bottom: 10px;
            }
        }

        .container-right {
            .youtube-embed {
                position: relative; 
                width: 100%; 
                overflow: hidden; 
                padding-top: 56.25%;

                iframe {
                    position: absolute; 
                    top: 0; 
                    left: 0; 
                    right: 0; 
                    width: 100%; 
                    height: 100%; 
                    border: none;
                }
            }

        }
        `
    ]
})
export class MovieDetailsComponent implements OnInit {

    movie?: Movie & { joinedGenres: string };

    notFound = false;

    constructor(
        private route: ActivatedRoute,
        private moviesService: MoviesService
    ) { }

    public ngOnInit() {
        const movie = this.moviesService.getMovie(this.route.snapshot.params['id']);

        if (!movie) {
            this.notFound = true;

            return;
        }

        this.movie = { ...movie, joinedGenres: movie.genre.join(', ') };
    }


}