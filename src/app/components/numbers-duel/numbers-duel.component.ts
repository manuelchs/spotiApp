import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-numbers-duel',
    templateUrl: './numbers-duel.component.html',
    styleUrls: ['./numbers-duel.component.scss']
})
export class NumbersDuelComponent implements OnInit {

    artistHome?: Artist;
    artistAway?: Artist;
    albumsHome?: Album[];
    albumsAway?: Album[];

    showInfo: boolean = false;


    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
    }

    getAlbums(): void {
        if (this.artistHome && !this.albumsHome) {
            this.spotifyService.getAllArtistAlbums(this.artistHome.id).subscribe(albums => {
                this.albumsHome = albums;
            })
        }
        if (this.artistAway && !this.albumsAway) {
            this.spotifyService.getAllArtistAlbums(this.artistAway.id).subscribe(albums => {
                this.albumsAway = albums;
            })
        }
    }

    clearData(type: string): void {
        if (type === 'home') {
            this.albumsHome = undefined;
            this.artistHome = undefined;
        } else {
            this.albumsAway = undefined;
            this.artistAway = undefined;
        }
    }
}
