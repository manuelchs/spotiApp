import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-main-title',
    templateUrl: './main-title.component.html',
    styleUrls: ['./main-title.component.scss']
})
export class MainTitleComponent implements OnInit {

    @Input() title!: string;
    @Input() icon!: string;
    @Input() questionButton: boolean = false;

    @Output() questionButtonClick: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }

}
