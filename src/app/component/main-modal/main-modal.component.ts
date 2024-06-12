import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-main-modal',
    templateUrl: './main-modal.component.html',
    styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {

    @Output() closeModal: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
