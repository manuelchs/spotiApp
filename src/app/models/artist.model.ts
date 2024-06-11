export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: string | null;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}

export interface Artist {
    id: string;
    name: string;
    genres: string[];
    external_urls: ExternalUrls;
    followers: Followers;
    images: Image[];
    popularity: number;
    href: string;
    uri: string;
    color: string;
}
