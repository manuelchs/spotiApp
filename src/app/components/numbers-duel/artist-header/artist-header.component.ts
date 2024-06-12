import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Artist } from 'src/app/models/artist.model';

@Component({
    selector: 'app-artist-header',
    templateUrl: './artist-header.component.html',
    styleUrls: ['./artist-header.component.scss']
})
export class ArtistHeaderComponent implements OnInit {

    @Input() artist?: Artist;
    @Input() isHome: boolean = true;
    @Output() clearArtist: EventEmitter<void> = new EventEmitter();
    thinVersion: boolean = false;

    constructor() { }

    ngOnInit(): void {
        this.checkThinVersion();
        console.log(this.artist);
    }

    getBgImg(): string {
        if (this.artist)
            return `url('${this.artist.images[0].url}')`;
        else
            return '';
    }

    checkThinVersion(): void {
        this.thinVersion = window.scrollY > 140;
    }

    _clearArtist(): void {
        console.log('Clear');
        this.artist = undefined;
        this.clearArtist.emit();
    }

    @HostListener('window:scroll', ['$event'])
    scrollingPage() {
        this.checkThinVersion();
    }

}
