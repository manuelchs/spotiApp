import { Album } from './album.model';
import { Artist, ExternalUrls } from './artist.model';

export interface Track {
    id: string;
    name: string;
    duration_ms: number;
    popularity: number;
    album: Album;
    artists: Artist[];
    external_urls: ExternalUrls;
    href: string;
    uri: string;
    features: Features;
}

interface Features {
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    type: string;
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    duration_ms: number;
    time_signature: number;
}

