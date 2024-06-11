import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-songs-playlist',
    templateUrl: './songs-playlist.component.html',
    styleUrls: ['./songs-playlist.component.scss']
})
export class SongsPlaylistComponent implements OnInit {

    @Input() artistId!: string;

    tracks?: Track[];

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
        this.spotifyService.getArtistTopTracks(this.artistId).subscribe(tracks => {
            this.tracks = tracks;
        })
    }

}
