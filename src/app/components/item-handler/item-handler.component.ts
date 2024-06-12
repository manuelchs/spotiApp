import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album, AlbumWithTracks } from 'src/app/models/album.model';
import { Playlist, PlaylistWithTracks } from 'src/app/models/playlist.model';

@Component({
    selector: 'app-item-handler',
    templateUrl: './item-handler.component.html',
    styleUrls: ['./item-handler.component.scss']
})
export class ItemHandlerComponent implements OnInit {
    @Input() item?: AlbumWithTracks | PlaylistWithTracks;
    @Output() deleteItem: EventEmitter<AlbumWithTracks | PlaylistWithTracks> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
