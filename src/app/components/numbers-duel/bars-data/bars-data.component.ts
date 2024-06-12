import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { DuelData } from 'src/app/models/duelData.model';
import { DurationFormatPipe } from 'src/app/pipes/duration-format.pipe';
import { ColorService } from 'src/app/services/color.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
    selector: 'app-bars-data',
    templateUrl: './bars-data.component.html',
    styleUrls: ['./bars-data.component.scss']
})
export class BarsDataComponent implements OnInit {

    @Input() artistHome!: Artist;
    @Input() artistAway!: Artist;
    @Input() albumsHome!: Album[];
    @Input() albumsAway!: Album[];

    comparisions: DuelData[] = [];

    constructor(private decimalPipe: DecimalPipe, private spotifyService: SpotifyService, private durationFormatPipe: DurationFormatPipe) { }

    ngOnInit(): void {
        this.setComparision();
        this.setAlbumComparisions();
        this.getTimeOfPlay();
    }

    setComparision(): void {
        const followersHomeStr: any = this.decimalPipe.transform(this.artistHome.followers.total, '1.0-0');
        const followersAwayStr: any = this.decimalPipe.transform(this.artistAway.followers.total, '1.0-0');
        this.comparisions.push({
            title: 'Popularidad',
            home: {
                label: this.artistHome.popularity.toString(),
                value: this.artistHome.popularity
            },
            away: {
                label: this.artistAway.popularity.toString(),
                value: this.artistAway.popularity
            }
        });
        this.comparisions.push({
            title: 'Seguidores',
            home: {
                label: followersHomeStr,
                value: this.artistHome.followers.total
            },
            away: {
                label: followersAwayStr,
                value: this.artistAway.followers.total
            }
        });

        let homeAlbumsStr: any = this.decimalPipe.transform(this.albumsHome.length, '1.0-0');
        let awayAlbumsStr: any = this.decimalPipe.transform(this.albumsAway.length, '1.0-0');
        this.comparisions.push({
            title: 'Albumes publicados',
            home: {
                label: homeAlbumsStr,
                value: this.albumsHome.length
            },
            away: {
                label: awayAlbumsStr,
                value: this.albumsAway.length
            }
        })
    }

    setAlbumComparisions(): void {
        let homeTotalTracks = 0;
        let awayTotalTracks = 0;
        this.albumsHome.forEach(album => {
            homeTotalTracks += album.total_tracks;
        });
        this.albumsAway.forEach(album => {
            awayTotalTracks += album.total_tracks;
        });

        const homeTotalTracksStr: any = this.decimalPipe.transform(homeTotalTracks, '1.0-0');
        const awayTotalTracksStr: any = this.decimalPipe.transform(awayTotalTracks, '1.0-0');

        this.comparisions.push({
            title: 'Canciones publicadas',
            home: {
                label: homeTotalTracksStr,
                value: homeTotalTracks
            },
            away: {
                label: awayTotalTracksStr,
                value: awayTotalTracks
            }
        })
    }

    getTimeOfPlay(): void {

        this.comparisions.push({
            title: 'Tiempo de reproducción disponible',
            home: {
                label: '0',
                value: 0
            },
            away: {
                label: '0',
                value: 0
            }
        })

        const albumsHomeIds: string[] = [];
        let homeDuration: number = 0;
        this.albumsHome.forEach(album => {
            albumsHomeIds.push(album.id);
        });
        this.spotifyService.getAlbumsDetails(albumsHomeIds).subscribe(response => {
            response.forEach(album => {
                album.tracks.items.forEach(track => {
                    homeDuration += track.duration_ms;
                });
            });
            this.comparisions.filter(comparing => comparing.title === 'Tiempo de reproducción disponible')[0].home = {
                label: this.durationFormatPipe.transform(homeDuration),
                value: homeDuration
            };
        })

        const albumsAwayIds: string[] = [];
        let awayDuration: number = 0;
        this.albumsAway.forEach(album => {
            albumsAwayIds.push(album.id);
        });
        this.spotifyService.getAlbumsDetails(albumsAwayIds).subscribe(response => {
            response.forEach(album => {
                album.tracks.items.forEach(track => {
                    awayDuration += track.duration_ms;
                });
            });
            this.comparisions.filter(comparing => comparing.title === 'Tiempo de reproducción disponible')[0].away = {
                label: this.durationFormatPipe.transform(awayDuration),
                value: awayDuration
            };
        })
    }
}
