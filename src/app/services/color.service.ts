import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ColorThief from 'colorthief';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor() { }

    extractColorFromImage(imageUrl: string, referenceColor?: string): Observable<string> {
        return new Observable(observer => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imageUrl;
            img.onload = () => {
                try {
                    const colorThief = new ColorThief();
                    const dominantColor = colorThief.getColor(img);
                    let [r, g, b] = dominantColor;
                    observer.next('');

                } catch (error) {
                    observer.error(error);
                } finally {
                    observer.complete();
                }
            };
            img.onerror = err => {
                observer.error(err);
            };
        });
    }
}
