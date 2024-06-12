import { AlbumsResponse } from "./album.model";
import { ExternalUrls, Image } from "./artist.model";
import { Track } from "./track.model";

export interface Owner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface PlaylistTracks {
    href: string;
    total: number;
}

export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    primary_color: string | null;
    public: boolean | null;
    snapshot_id: string;
    tracks: PlaylistTracks;
    type: string;
    uri: string;
}

export interface PlaylistsResponse {
    href: string;
    items: Playlist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface PlaylistsAlbumsResponse {
    albums: AlbumsResponse;
    playlists: PlaylistsResponse;
}

export interface PlaylistWithTracks extends Playlist {
    tracksWithFeatures: Track[];
}
