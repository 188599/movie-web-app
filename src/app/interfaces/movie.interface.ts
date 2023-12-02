import { SafeResourceUrl } from "@angular/platform-browser";

export interface Movie {

    id: number;
    
    title: string;

    description: string;

    rating: number;

    duration: string;

    genre: string[];

    releaseDate: string;

    trailerUrl: SafeResourceUrl;

    thumbnail: string;

    watchlist: boolean;


}