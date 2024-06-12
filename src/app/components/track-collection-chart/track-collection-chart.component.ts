import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { AlbumWithTracks } from 'src/app/models/album.model';
import { PlaylistWithTracks } from 'src/app/models/playlist.model';
import { FeatureTrackAvailable, Track } from 'src/app/models/track.model';
import { Colors } from 'chart.js';

Chart.register(Colors);

@Component({
    selector: 'app-track-collection-chart',
    templateUrl: './track-collection-chart.component.html',
    styleUrls: ['./track-collection-chart.component.scss']
})
export class TrackCollectionChartComponent implements OnInit, OnChanges {

    @Input() tracksCollections!: Array<AlbumWithTracks | PlaylistWithTracks>;

    features: FeatureTrackAvailable[] = [];

    mainChart?: Chart<"scatter">;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('algo cambio');
        if (changes['tracksCollections']) {
            console.log('CAMBIO LA COLLECCION');
            this.setDataGraph();
        }
    }


    setDataGraph(features?: FeatureTrackAvailable[]): void {
        if (features || this.features.length > 0) {
            if (features) {
                this.features = features;
            }
            let datasets: any[] = [];
            this.tracksCollections.forEach((collection, index) => {
                if (index === 0) {
                    datasets.push({
                        backgroundColor: '#1DB955',
                        label: collection.name,
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        data: []
                    });
                } else {
                    datasets.push({
                        label: collection.name,
                        pointRadius: 5,
                        pointHoverRadius: 10,
                        data: []
                    });
                }
                collection.tracksWithFeatures.forEach(track => {
                    datasets[index].data.push({ x: this.formatValue(track, 'x'), y: this.formatValue(track, 'y'), name: `${track.name} - ${track.artists[0].name}` });
                });
            });
            this.setGraph(datasets);
        }
    }

    formatValue(track: Track | any, axis: 'x' | 'y'): number {
        console.log(this.features);
        if (axis === 'x') {
            if (this.features[0].feature_value === 'popularity') {
                return track.popularity;
            } else {
                return track.features[this.features[0].feature_value];
            }
        } else {
            if (this.features[1].feature_value === 'popularity') {
                return track.popularity;
            } else {
                return track.features[this.features[1].feature_value];
            }
        }
    }

    setGraph(datasets: any[]): void {
        if (this.mainChart) {
            this.mainChart.config.data.datasets = datasets;
            this.mainChart.options = this.getChartOptions();
            this.mainChart.update();
        } else {
            this.mainChart = new Chart('mainChart', {
                type: 'scatter',
                data: {
                    datasets: datasets
                },
                options: this.getChartOptions()

            });
        }
    }


    getChartOptions(): any {
        return {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: this.features[0].feature_label,
                        font: {
                            size: 16
                        }
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: this.features[1].feature_label,
                        font: {
                            size: 16
                        }
                    },
                }
            },
            plugins: {
                colors: {
                    forceOverride: true
                },
                tooltip: {
                    callbacks: {
                        label: (context: any) => {
                            const _context: any = context;
                            return _context.raw.name;
                        },
                        title: (items: any[]) => {
                            return items[0].dataset.label;
                        }
                    }
                }
            }
        }
    }

}
