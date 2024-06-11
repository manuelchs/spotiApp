import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';

@Component({
    selector: 'app-search-header',
    templateUrl: './search-header.component.html',
    styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent implements OnInit {
    @Input() isHome: boolean = true;
    @Output() artistSelected: EventEmitter<Artist> = new EventEmitter();
    @Output() clearArtist: EventEmitter<void> = new EventEmitter();


    artist?: Artist;

    constructor() { }

    ngOnInit(): void {
    }

}
