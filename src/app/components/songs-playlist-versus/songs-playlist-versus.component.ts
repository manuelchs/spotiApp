import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-songs-playlist-versus',
    templateUrl: './songs-playlist-versus.component.html',
    styleUrls: ['./songs-playlist-versus.component.scss']
})
export class SongsPlaylistVersusComponent implements OnInit {

    @Input() artistHomeId!: string;
    @Input() artistAwayId!: string;

    tracksHome?: Track[] = new Array(10);
    tracksAway?: Track[] = new Array(10);

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
        this.getTracks();
    }

    getTracks(): void {
        this.spotifyService.getArtistTopTracks(this.artistHomeId).subscribe(tracks => {
            this.tracksHome = tracks;
        });
        this.spotifyService.getArtistTopTracks(this.artistAwayId).subscribe(tracks => {
            this.tracksAway = tracks;
        });
    }

}
