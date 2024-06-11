import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

    transform(milliseconds: number): string {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
    }

}
