import { Component, Input, OnInit } from '@angular/core';
import { Track, VersusTrack } from 'src/app/models/track.model';

@Component({
    selector: 'app-song',
    templateUrl: './song.component.html',
    styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

    @Input() track?: VersusTrack;
    @Input() listNumber?: number;

    constructor() { }

    ngOnInit(): void {
    }

    getNumber(): string {
        if (this.listNumber) {
            let num = this.listNumber - Math.floor(this.listNumber / 2)
            return num.toString();
        } else {
            return '';
        }
    }

}
