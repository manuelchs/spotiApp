import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Album, AlbumWithTracks } from 'src/app/models/album.model';
import { Playlist, PlaylistWithTracks } from 'src/app/models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-collection-of-albums-and-playlist',
    templateUrl: './collection-of-albums-and-playlist.component.html',
    styleUrls: ['./collection-of-albums-and-playlist.component.scss']
})
export class CollectionOfAlbumsAndPlaylistComponent implements OnInit {

    @Output() collection: EventEmitter<Array<AlbumWithTracks | PlaylistWithTracks>> = new EventEmitter();

    _collection: Array<AlbumWithTracks | PlaylistWithTracks> = [];

    isSearching: boolean = false;
    loading: boolean = false;

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
    }

    getItem(item: { type: string; id: string; }): void {
        this.loading = true;
        this.isSearching = false;
        this.spotifyService.getAlbumOrPlaylist(item.id, item.type).subscribe(albumPlaylist => {
            this.spotifyService.getTracksWithFeatures(item.id, item.type).subscribe(tracks => {
                const itemWithTracks: AlbumWithTracks | PlaylistWithTracks | any = albumPlaylist;
                itemWithTracks.tracksWithFeatures = tracks;
                this._collection.push(itemWithTracks);
                this.collection.emit(this._collection);
                this.loading = false;
            })
        });
    }

    showSearch(): boolean {
        if (this._collection.length === 0) {
            if (this.loading) {
                return false;
            } else {
                return true;
            }
        } else {
            return this.isSearching;
        }
    }

    deleteItem(item: AlbumWithTracks | PlaylistWithTracks) {
        this._collection.splice(this._collection.indexOf(item), 1);
        this.collection.emit(this._collection);
        console.log(this._collection);
    }

}
