import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    private clientId = 'ecd2393a0b0740989fbad938985d40d3';
    private clientSecret = '94bb751c0d214078b5df450a3b6a6e4e';
    private token: string = '';

    constructor(private http: HttpClient) { }

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

    private ensureToken(): Observable<void> {
        if (this.token) {
            return of(undefined);
        } else {
            return this.getAuthToken().pipe(
                map(token => {
                    this.token = token;
                })
            );
        }
    }


}
