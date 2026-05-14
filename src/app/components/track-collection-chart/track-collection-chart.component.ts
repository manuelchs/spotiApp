import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
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
export class TrackCollectionChartComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input() tracksCollections!: Array<AlbumWithTracks | PlaylistWithTracks>;
    @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

    features: FeatureTrackAvailable[] = [];
    mainChart?: Chart<"scatter">;
    private viewReady = false;

    ngAfterViewInit(): void {
        this.viewReady = true;
        this.tryRenderChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tracksCollections'] && this.viewReady) {
            this.tryRenderChart();
        }
    }

    ngOnDestroy(): void {
        this.mainChart?.destroy();
        this.mainChart = undefined;
    }

    setDataGraph(features?: FeatureTrackAvailable[]): void {
        if (features) {
            this.features = features;
        }
        this.tryRenderChart();
    }

    private tryRenderChart(): void {
        if (!this.viewReady || this.features.length < 2 || !this.tracksCollections?.length) return;

        const datasets: any[] = this.tracksCollections.map((collection, index) => {
            const dataset: any = {
                label: collection.name,
                pointRadius: 5,
                pointHoverRadius: 10,
                data: []
            };
            if (index === 0) dataset.backgroundColor = '#1DB955';

            (collection.tracksWithFeatures || []).forEach(track => {
                if (!track) return;
                dataset.data.push({
                    x: this.formatValue(track, 'x'),
                    y: this.formatValue(track, 'y'),
                    name: `${track.name} - ${track.artists?.[0]?.name ?? ''}`
                });
            });
            return dataset;
        });

        this.setGraph(datasets);
    }

    formatValue(track: Track | any, axis: 'x' | 'y'): number {
        const featureKey = axis === 'x' ? this.features[0].feature_value : this.features[1].feature_value;
        if (featureKey === 'popularity') return track.popularity ?? 0;
        if (featureKey === 'duration_ms') return Math.round((track.duration_ms ?? 0) / 1000);
        return track.features?.[featureKey] ?? 0;
    }

    setGraph(datasets: any[]): void {
        if (this.mainChart) {
            this.mainChart.config.data.datasets = datasets;
            this.mainChart.options = this.getChartOptions();
            this.mainChart.update();
        } else {
            this.mainChart = new Chart(this.chartCanvas.nativeElement, {
                type: 'scatter',
                data: { datasets },
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
