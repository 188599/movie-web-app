import { Injectable } from "@angular/core";
import { Movie } from "../interfaces/movie.interface";
import * as dayjs from "dayjs";
import { DomSanitizer } from "@angular/platform-browser";
import * as moviesJson from '../movies.json';

@Injectable({ providedIn: 'root' })
export class MoviesService {

    private movies!: Movie[];

    private _watchList: Set<number> = new Set();

    private WATCHLIST_STORAGE_KEY = 'WATCHLIST_STORAGE_KEY';

    public get watchList() {
        return [...Array.from(this._watchList)] as const;
    }


    constructor(private sanitizer: DomSanitizer) {
        this.retrieveWatchListFromLocalStorage();
        this.setMovies();
    }


    public getMovies() {
        return this.movies;
    }

    public getMovie(id: number) {
        return this.movies.find(movie => movie.id == id);
    }

    public addToWatchList(id: number) {
        this._watchList.add(id);

        this.saveWatchListToLocalStorage();
    }

    public removeFromWatchList(id: number) {
        this._watchList.delete(id);

        this.saveWatchListToLocalStorage();
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

    private retrieveWatchListFromLocalStorage() {
        const watchList = localStorage.getItem(this.WATCHLIST_STORAGE_KEY);

        if (watchList) {
            this._watchList = new Set(JSON.parse(watchList));
        }
    }

    private saveWatchListToLocalStorage() {
        localStorage.setItem(this.WATCHLIST_STORAGE_KEY, JSON.stringify(this.watchList));
    }

}