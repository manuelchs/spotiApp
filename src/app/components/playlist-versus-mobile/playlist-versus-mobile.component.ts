import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Track, VersusTrack } from 'src/app/models/track.model';

@Component({
    selector: 'app-playlist-versus-mobile',
    templateUrl: './playlist-versus-mobile.component.html',
    styleUrls: ['./playlist-versus-mobile.component.scss']
})
export class PlaylistVersusMobileComponent implements OnInit, OnChanges {

    @Input() homeTracks?: Track[] = [];
    @Input() awayTracks?: Track[] = [];

    tracksToShow: VersusTrack[] = [];
    homeNameSetted: boolean = false;
    awayNameSetted: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.generateTrackList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.generateTrackList();
    }

    generateTrackList(): void {
        if (this.homeTracks && this.awayTracks) {
            this.tracksToShow = new Array();
            for (let index = 0; index < 10; index++) {
                if (this.homeTracks[index]) {
                    this.tracksToShow.push({ ...this.homeTracks[index], versusType: 'home' });
                }
                if (this.awayTracks[index]) {
                    this.tracksToShow.push({ ...this.awayTracks[index], versusType: 'away' });
                }
            }
            console.log(this.tracksToShow);
        }
    }
}
