import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import Chart from 'chart.js/auto'
import { Playlist } from 'src/app/models/playlist.model';
import { Album } from 'src/app/models/album.model';

@Component({
    selector: 'app-why-is-popular',
    templateUrl: './why-is-popular.component.html',
    styleUrls: ['./why-is-popular.component.scss']
})
export class WhyIsPopularComponent implements OnInit {

    idItem?: { type: string; id: string; };

    item?: Album | Playlist;

    constructor(private spotifyService: SpotifyService) { }

    ngOnInit(): void {
    }

    getItem(idItem: { type: string; id: string; }): void {
        this.idItem = idItem;
        this.getInfoItem();
        this.spotifyService.getTracksWithFeatures(idItem.id, idItem.type).subscribe(response => {
            const datasetsDanceability: unknown[] = [];
            const datasetsLoudness: unknown[] = [];
            response.forEach(track => {
                datasetsDanceability.push({
                    backgroundColor: '#1DB955',
                    label: `${track.name} - ${track.artists[0].name}`,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    data: [[track.features.danceability, track.popularity]]
                });

                datasetsLoudness.push({
                    backgroundColor: '#1DB955',
                    label: `${track.name} - ${track.artists[0].name}`,
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    data: [[track.features.loudness, track.popularity]]
                });
            })
            this.setGraphDance(datasetsDanceability);
            this.setGraphLoudness(datasetsLoudness);
        })
    }

    getInfoItem(): void {
        if (this.idItem) {
            this.spotifyService.getAlbumOrPlaylist(this.idItem.id, this.idItem.type).subscribe(response => {
                this.item = response;
            })
        }
    }

    setGraphDance(datasets: any[]): void {
        const myChart = new Chart('danceChart', {
            type: 'scatter',
            data: {
                yLabels: [0, 100],
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    setGraphLoudness(datasets: any[]): void {
        const myChart = new Chart('loudnessChart', {
            type: 'scatter',
            data: {
                yLabels: [0, 100],
                datasets: datasets
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}
