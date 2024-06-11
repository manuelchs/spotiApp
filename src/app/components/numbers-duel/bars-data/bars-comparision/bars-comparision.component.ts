import { Component, Input, OnInit } from '@angular/core';
import { DuelData } from 'src/app/models/duelData.model';

@Component({
    selector: 'app-bars-comparision',
    templateUrl: './bars-comparision.component.html',
    styleUrls: ['./bars-comparision.component.scss']
})
export class BarsComparisionComponent implements OnInit {

    @Input() comparision!: DuelData;

    @Input() homeColor: string = 'transparent';
    @Input() awayColor: string = 'transparent';

    homeValue: number = 0;
    awayValue: number = 0;

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.setValues();
        }, 500)
    }

    setValues(): void {
        const total = this.comparision.home.value + this.comparision.away.value;
        this.homeValue = Math.ceil(this.comparision.home.value / total * 100);
        this.awayValue = 100 - this.homeValue;
    }

    getTrackWidth(type: string): string {
        this.setValues();
        if (type === 'home')
            return `${this.homeValue}%`;
        else
            return `${this.awayValue}%`;
    }

}
