import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-track-analyzer-info-modal',
    templateUrl: './track-analyzer-info-modal.component.html',
    styleUrls: ['./track-analyzer-info-modal.component.scss']
})
export class TrackAnalyzerInfoModalComponent implements OnInit {

    @Output() closeModal: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
