import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-country-selector',
    templateUrl: './country-selector.component.html',
    styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit {

    countries: Country[] = environment.countries as Country[];
    countryCode: string = '';
    countrySelected?: Country;

    constructor() {
        this.countries.sort((a, b) => Number(a.name > b.name));
        console.log(this.countries);
    }

    ngOnInit(): void {
    }

    changeSelector(e: any): void {
        this.countrySelected = this.countries.filter(country => country.code === this.countryCode)[0];
        console.log(this.countrySelected);
    }

}

interface Country {
    name: string;
    code: string;
    flag: string;
}
