import { Component, OnInit } from '@angular/core';
import { AlbumWithTracks } from 'src/app/models/album.model';
import { PlaylistWithTracks } from 'src/app/models/playlist.model';

@Component({
    selector: 'app-track-analyzer',
    templateUrl: './track-analyzer.component.html',
    styleUrls: ['./track-analyzer.component.scss']
})
export class TrackAnalyzerComponent implements OnInit {

    collection: Array<AlbumWithTracks | PlaylistWithTracks> = [];

    showInfo: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    setCollection(newCollection: Array<AlbumWithTracks | PlaylistWithTracks>): void {
        this.collection = [];
        newCollection.forEach(item => {
            this.collection.push(item);
        })
    }


}
