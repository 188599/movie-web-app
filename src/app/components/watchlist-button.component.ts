import { Component, Input, OnInit } from "@angular/core";
import { MoviesService } from "../services/movies.service";

@Component({
    selector: 'app-watchlist-button',
    template: `        
        <mat-chip-option type="button" color="primary" (click)="toggleWatchlist($event, id)" highlighted [color]="!onWatchlist ? 'primary' : 'accent'" selectable=false> 
            {{ !onWatchlist ? 'Add to watchlist' : 'Remove from watchlist' }}
        </mat-chip-option>
    `
})
export class WatchListButtonComponent implements OnInit {

    @Input()
    public id!: number;

    public onWatchlist = false;


    constructor(private moviesService: MoviesService) { }

    public ngOnInit() {
        this.onWatchlist = this.moviesService.getMovie(this.id)?.watchlist ?? false;
    }

    public toggleWatchlist(event: MouseEvent, id: number) {
        event.stopPropagation();

        this.onWatchlist = !this.onWatchlist;

        if (this.onWatchlist) {
            this.moviesService.addToWatchList(id);
        }

        else {
            this.moviesService.removeFromWatchList(id);
        }
    }

}