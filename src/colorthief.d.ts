declare module 'colorthief' {
    export default class ColorThief {
        getColor(image: HTMLImageElement | string, quality?: number): [number, number, number];
        getPalette(image: HTMLImageElement | string, colorCount?: number, quality?: number): [number, number, number][];
    }
}
