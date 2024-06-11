import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/models/track.model';

@Component({
    selector: 'app-song',
    templateUrl: './song.component.html',
    styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

    @Input() track!: Track;

    constructor() { }

    ngOnInit(): void {
    }

}
