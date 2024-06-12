import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FeatureTrackAvailable } from 'src/app/models/track.model';

@Component({
    selector: 'app-selector-of-features',
    templateUrl: './selector-of-features.component.html',
    styleUrls: ['./selector-of-features.component.scss']
})
export class SelectorOfFeaturesComponent implements OnInit {

    @Output() features: EventEmitter<FeatureTrackAvailable[]> = new EventEmitter();

    featuresAvailable: FeatureTrackAvailable[] = [{ feature_label: 'Popularidad', feature_value: 'popularity' }, { feature_label: 'Bailabilidad', feature_value: 'danceability' }, { feature_label: 'Energía', feature_value: 'energy' }, { feature_label: 'Tonalidad', feature_value: 'key' }, { feature_label: 'Volumen (DB)', feature_value: 'loudness' }, { feature_label: 'Modo (mayor o menor)', feature_value: 'mode' }, { feature_label: 'Presencia de voz hablada', feature_value: 'speechiness' }, { feature_label: 'Sonido acústico', feature_value: 'acousticness' }, { feature_label: 'Instrumentalidad', feature_value: 'instrumentalness' }, { feature_label: 'Probabilidad de producción en vivo', feature_value: 'liveness' }, { feature_label: 'Emotividad', feature_value: 'valence' }, { feature_label: 'Tempo', feature_value: 'tempo' }];

    featuresSelected: FeatureTrackAvailable[] = [this.featuresAvailable[0], this.featuresAvailable[1]];

    constructor() {
        console.log(this.featuresSelected);
    }

    ngOnInit(): void {
        this.setFeatureSelected();
    }

    setFeatureSelected(): void {
        this.features.emit(this.featuresSelected);
    }

}
