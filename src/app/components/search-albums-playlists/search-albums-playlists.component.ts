import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumSearchItem } from 'src/app/models/album.model';
import { PlaylistsAlbumsResponse, Playlist } from 'src/app/models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-search-albums-playlists',
    templateUrl: './search-albums-playlists.component.html',
    styleUrls: ['./search-albums-playlists.component.scss']
})
export class SearchAlbumsPlaylistsComponent implements OnInit {
    @Output() blur: EventEmitter<void> = new EventEmitter();
    @Output() idItem: EventEmitter<{ type: string; id: string; }> = new EventEmitter();

    response?: PlaylistsAlbumsResponse | null;
    loading: boolean = false;
    timeoutSearch?: NodeJS.Timeout;

    albums: AlbumSearchItem[] = [];
    playlists: Playlist[] = [];

    tabActive: string = 'playlist';

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
    }

    search(term: string): void {
        this.loading = true;
        clearTimeout(this.timeoutSearch);
        const validUrl = this.spotifyService.isValidSpotifyUrl(term);
        if (validUrl) {
            if (validUrl.type === 'album' || validUrl.type === 'playlist') {
                this.idItem.emit(validUrl);
            }
        } else {
            if (term === '') {
                this.response = null;
            } else {
                this.timeoutSearch = setTimeout(() => {
                    this.spotifyService.searchAlbumsAndPlaylist(term).subscribe((response) => {
                        if (response) {
                            this.albums = response.albums.items;
                            this.playlists = response.playlists.items;
                        }
                    })
                }, 300);
            }
        }
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
