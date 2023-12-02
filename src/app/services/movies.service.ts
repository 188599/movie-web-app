import { Injectable } from "@angular/core";
import { Movie } from "../interfaces/movie.interface";
import * as dayjs from "dayjs";
import { DomSanitizer } from "@angular/platform-browser";
import * as moviesJson from '../movies.json';

@Injectable({ providedIn: 'root' })
export class MoviesService {

    private movies!: Movie[];


    constructor(private sanitizer: DomSanitizer) {
        this.setMovies();
    }


    public getMovies() {
        return this.movies;
    }

    public getMovie(id: number) {
        return this.movies.find(movie => movie.id == id);
    }


    private setMovies() {
        const movies = Array.from(moviesJson);
        const moviesService = this;

        this.movies = movies.map(movie => ({
            ...movie,
            trailerUrl: this.sanitizer.bypassSecurityTrustResourceUrl(movie.trailer_url.replace('watch?v=', 'embed/')),
            releaseDate: dayjs(movie.released_date).format('LL'),
            duration: `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}min`,
            get watchlist() { return moviesService.watchList.includes(this.id) }
        }));
    }

}