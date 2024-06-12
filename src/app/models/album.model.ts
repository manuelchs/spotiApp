import { Artist, ExternalUrls, Image } from './artist.model';
import { Track } from './track.model';

export interface Album {
    id: string;
    name: string;
    release_date: string;
    total_tracks: number;
    artists: Artist[];
    external_urls: ExternalUrls;
    images: Image[];
    popularity: number;
    href: string;
    uri: string;
}

interface Restrictions {
    reason: string;
}

interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
}

interface CompilationAlbum {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    type: string;
    uri: string;
    artists: Artist[];
    tracks: {
        href: string;
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total: number;
        items: Track[];
    };
    copyrights: {
        text: string;
        type: string;
    }[];
    external_ids: ExternalIds;
    genres: string[];
    label: string;
    popularity: number;
}

export interface AlbumSearchItem {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface AlbumsResponse {
    href: string;
    items: AlbumSearchItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface AlbumWithTracks extends Album {
    tracksWithFeatures: Track[];
}

export interface ExtendedAlbum extends Album, CompilationAlbum { }
