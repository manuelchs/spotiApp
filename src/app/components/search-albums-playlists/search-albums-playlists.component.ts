import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumSearchItem } from 'src/app/models/album.model';
import { Playlist } from 'src/app/models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-search-albums-playlists',
    templateUrl: './search-albums-playlists.component.html',
    styleUrls: ['./search-albums-playlists.component.scss']
})
export class SearchAlbumsPlaylistsComponent implements OnInit {
    @Output() blur: EventEmitter<void> = new EventEmitter();
    @Output() idItem: EventEmitter<{ type: string; id: string; }> = new EventEmitter();

    loading: boolean = false;
    searched: boolean = false;
    timeoutSearch?: NodeJS.Timeout;

    albums: AlbumSearchItem[] = [];
    playlists: Playlist[] = [];

    tabActive: string = 'playlist';

    get hasResults(): boolean {
        return this.albums.length > 0 || this.playlists.length > 0;
    }

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
    }

    search(term: string): void {
        clearTimeout(this.timeoutSearch);
        const validUrl = this.spotifyService.isValidSpotifyUrl(term);
        if (validUrl) {
            if (validUrl.type === 'album' || validUrl.type === 'playlist') {
                this.idItem.emit(validUrl);
            }
            return;
        }
        if (term === '') {
            this.albums = [];
            this.playlists = [];
            this.searched = false;
            return;
        }
        this.loading = true;
        this.timeoutSearch = setTimeout(() => {
            this.spotifyService.searchAlbumsAndPlaylist(term).subscribe((response) => {
                this.loading = false;
                this.searched = true;
                if (response) {
                    this.albums = response.albums.items.filter(item => item != null);
                    this.playlists = response.playlists.items.filter(item => item != null);
                }
            });
        }, 300);
    }

    selectItem(item: AlbumSearchItem | Playlist): void {
        this.idItem.emit({
            type: item.type,
            id: item.id
        })
    }

    onBlur(): void {
        setTimeout(() => {
            this.blur.emit();
        }, 300);
    }

}
