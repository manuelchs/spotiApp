import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { Playlist } from 'src/app/models/playlist.model';

@Component({
    selector: 'app-item-handler',
    templateUrl: './item-handler.component.html',
    styleUrls: ['./item-handler.component.scss']
})
export class ItemHandlerComponent implements OnInit {
    @Input() item?: Album | Playlist;
    @Output() clearItem: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
