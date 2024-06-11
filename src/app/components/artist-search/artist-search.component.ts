import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Artist } from '../../models/artist.model';

@Component({
    selector: 'app-artist-search',
    templateUrl: './artist-search.component.html',
    styleUrls: ['./artist-search.component.scss']
})
export class ArtistSearchComponent {

    @Input() isHome: boolean = true;

    @Output() artistSelected: EventEmitter<Artist> = new EventEmitter();

    artists: Artist[] = [];
    loading: boolean = false;

    timeoutSearch?: NodeJS.Timeout;

    constructor(private spotifyService: SpotifyService) { }

    search(term: string): void {
        this.loading = true;
        clearTimeout(this.timeoutSearch);
        if (term === '') {
            this.artists = [];
        } else {
            this.timeoutSearch = setTimeout(() => {
                this.spotifyService.searchArtists(term).subscribe((artists) => {
                    this.artists = artists;
                    this.loading = false;
                })
            }, 300);
        }
    }

    ngOnInit(): void {
    }

    onSelect(artist: Artist): void {
        this.artistSelected.emit(artist);
    }
}
