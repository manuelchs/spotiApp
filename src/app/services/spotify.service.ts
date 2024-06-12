import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Artist } from '../models/artist.model';
import { Album, ExtendedAlbum } from '../models/album.model';
import { Track } from '../models/track.model';
import { Playlist, PlaylistsAlbumsResponse } from '../models/playlist.model';
import { SpotifyUrlDetails } from '../models/otherSpotify.model';
import { AlertsService } from './alerts.service';

@Injectable({
    providedIn: 'root'
})

export class SpotifyService {
    private clientId = 'ecd2393a0b0740989fbad938985d40d3';
    private clientSecret = '94bb751c0d214078b5df450a3b6a6e4e';
    private token: string = '';
    private apiUrl = 'https://api.spotify.com/v1';

    constructor(private http: HttpClient, private alerts: AlertsService) {
        this.getAuthToken().subscribe(token => {
            this.token = token;
        });
    }

    private getAuthToken(): Observable<string> {
        const body = new URLSearchParams();
        body.set('grant_type', 'client_credentials');
        body.set('client_id', this.clientId);
        body.set('client_secret', this.clientSecret);

        return this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }).pipe(
            map(response => response.access_token)
        );
    }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.token}`
        });
    }

    // FUNCIÓN PARA BUSCAR ARTISTAS
    public searchArtists(query: string): Observable<Artist[]> {
        const params = new HttpParams().set('q', query).set('type', 'artist');
        return this.http.get<any>('https://api.spotify.com/v1/search', { params: params, headers: this.getHeaders() }).pipe(
            map(response => response.artists.items),
            catchError((err) => {
                this.alerts.showAlertErrorDefault();
                return of([])
            })
        );
    }

    // FUNCIÓN PARA BUSCAR ALBUMS Y PLAYLISTS
    public searchAlbumsAndPlaylist(query: string): Observable<PlaylistsAlbumsResponse | null> {
        const params = new HttpParams().set('q', query).set('type', 'album,playlist');
        return this.http.get<PlaylistsAlbumsResponse>('https://api.spotify.com/v1/search', { params: params, headers: this.getHeaders() }).pipe(
            map(response => response),
            catchError((err) => {
                this.alerts.showAlertErrorDefault();
                return of(null)
            })
        );
    }

    // FUNCIÓN PARA OBTENER ARTISTA
    public getArtist(id: string): Observable<Artist | null> {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: this.getHeaders() }).pipe(
            map(response => {
                console.log(response);
                return response;
            }),
            catchError((err) => {
                this.alerts.showAlertErrorDefault();
                return of(null);
            })
        );
    }

    // FUNCIÓN PARA OBTENER TODOS LOS ÁLBUMES DE UN ARTISTA CON PAGINACIÓN
    private getArtistAlbumsRecursive(id: string, url?: string, allAlbums: Album[] = []): Observable<Album[]> {
        const params = new HttpParams().set('include_groups', 'album,single,compilation').set('limit', 50);

        let urlToRequest = url ? url : `https://api.spotify.com/v1/artists/${id}/albums`;

        return this.http.get<any>(urlToRequest, { params: params, headers: this.getHeaders() }).pipe(
            switchMap(response => {
                const albums = response.items;
                allAlbums.push(...albums);
                if (response.next) {
                    return this.getArtistAlbumsRecursive(id, response.next, allAlbums);
                } else {
                    return of(allAlbums);
                }
            }),
            catchError((err) => {
                this.alerts.showAlertErrorDefault();
                return of([]);
            })
        );
    }

    // FUNCIÓN PARA OBTENER TODOS LOS ÁLBUMES DE UN ARTISTA SIN PAGINACIÓN
    public getAllArtistAlbums(id: string): Observable<Album[]> {
        return this.getArtistAlbumsRecursive(id);
    }

    // FUNCIÓN PARA OBTENER LOS DETALLES DE ALBUMES
    public getAlbumsDetails(ids: string[]): Observable<ExtendedAlbum[]> {
        return this.getAlbumsDetailsRecursive(ids);

    }

    private getAlbumsDetailsRecursive(ids: string[], page: number = 1, allAlbums: ExtendedAlbum[] = []): Observable<ExtendedAlbum[]> {
        const limit = 20;
        const maxPage = Math.ceil(ids.length / limit);
        const idsToRequest = this.paginateIds(ids, limit, page);
        const idsStr = idsToRequest.join(',');
        const params = new HttpParams().set('ids', idsStr).set('market', 'MX');
        return this.http.get<any>(`https://api.spotify.com/v1/albums`, { params: params, headers: this.getHeaders() }).pipe(
            switchMap(response => {
                allAlbums.push(...response.albums);
                page++;
                if (page <= maxPage)
                    return this.getAlbumsDetailsRecursive(ids, page, allAlbums);
                else
                    return of(allAlbums)
            }),
            catchError(() => {
                this.alerts.showAlertErrorDefault();
                return of([]);
            })
        )
    }

    private paginateIds(ids: string[], pageSize: number, pageNumber: number): string[] {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return ids.slice(startIndex, endIndex);
    }

    // FUNCIÓN PARA OBTENER TOP 10
    public getArtistTopTracks(id: string): Observable<Track[]> {
        const params = new HttpParams().set('id', id);
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/top-tracks`, { params: params, headers: this.getHeaders() }).pipe(
            map(response => {
                return response.tracks;
            }),
            catchError(() => {
                this.alerts.showAlertErrorDefault();
                return of([]);
            })
        )
    }

    // Url válida
    isValidSpotifyUrl(url: string): SpotifyUrlDetails | null {
        // Expresiones regulares para validar URLs de Spotify
        const spotifyAlbumRegex = /^https:\/\/open\.spotify\.com\/album\/([a-zA-Z0-9]{22})(?:\?.*)?$/;
        const spotifyPlaylistRegex = /^https:\/\/open\.spotify\.com\/playlist\/([a-zA-Z0-9]{22})(?:\?.*)?$/;
        const spotifyTrackRegex = /^https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]{22})(?:\?.*)?$/;
        const spotifyArtistRegex = /^https:\/\/open\.spotify\.com\/artist\/([a-zA-Z0-9]{22})(?:\?.*)?$/;

        let match = spotifyAlbumRegex.exec(url);
        if (match) {
            return { type: 'album', id: match[1] };
        }

        match = spotifyPlaylistRegex.exec(url);
        if (match) {
            return { type: 'playlist', id: match[1] };
        }

        match = spotifyTrackRegex.exec(url);
        if (match) {
            return { type: 'track', id: match[1] };
        }

        match = spotifyArtistRegex.exec(url);
        if (match) {
            return { type: 'artist', id: match[1] };
        }

        return null; // URL no válida de Spotify
    }


    // FUNCIÓN PARA OBTENER TRACKS CON FEATURES
    getTracksWithFeatures(id: string, type: string): Observable<Track[]> {
        const url = `${this.apiUrl}/${type}s/${id}/tracks`;

        return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
            mergeMap((response: any) => {
                const tracks = response.items.map((item: any) => ({
                    id: item.track ? item.track.id : item.id,
                    name: item.track ? item.track.name : item.name,
                    artists: item.track ? item.track.artists : item.artists,
                    popularity: item.track ? item.track.popularity : item.popularity,
                }));
                const trackIds = tracks.map((track: any) => track.id).join(',');

                return this.http.get<any>(`${this.apiUrl}/audio-features?ids=${trackIds}`, { headers: this.getHeaders() }).pipe(
                    map((featuresResponse: any) => {
                        const features = featuresResponse.audio_features;
                        return tracks.map((track: any, index: any) => ({
                            ...track,
                            features: features[index]
                        }));
                    }),
                    catchError(() => {
                        this.alerts.showAlertErrorDefault();
                        return of(null);
                    })
                );
            }),
            catchError(() => {
                this.alerts.showAlertErrorDefault();
                return of([]);
            })
        );
    }

    public getAlbumOrPlaylist(id: string, type: string): Observable<Album | Playlist> {
        const url = `${this.apiUrl}/${type}s/${id}`;
        return this.http.get<any>(url, { headers: this.getHeaders() });
    }
}
