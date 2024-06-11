import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-option-sidebar',
    templateUrl: './option-sidebar.component.html',
    styleUrls: ['./option-sidebar.component.scss']
})
export class OptionSidebarComponent implements OnInit {

    @Input() icon: string = '';
    @Input() title: string = '';
    @Input() link: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
