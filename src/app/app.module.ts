import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumbersDuelComponent } from './components/numbers-duel/numbers-duel.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OptionSidebarComponent } from './components/sidebar/option-sidebar/option-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistHeaderComponent } from './components/numbers-duel/artist-header/artist-header.component';
import { BarsComparisionComponent } from './components/numbers-duel/bars-data/bars-comparision/bars-comparision.component';
import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.component';
import { SongComponent } from './components/song/song.component';
import { ArtistSearchComponent } from './components/artist-search/artist-search.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchHeaderComponent } from './components/numbers-duel/search-header/search-header.component';
import { MainTitleComponent } from './components/main-title/main-title.component';
import { DecimalPipe } from '@angular/common';
import { BarsDataComponent } from './components/numbers-duel/bars-data/bars-data.component';
import { FormsModule } from '@angular/forms';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { SearchAlbumsPlaylistsComponent } from './components/search-albums-playlists/search-albums-playlists.component';
import { ItemHandlerComponent } from './components/item-handler/item-handler.component';
import { TrackAnalyzerComponent } from './components/track-analyzer/track-analyzer.component';
import { SelectorOfFeaturesComponent } from './components/track-analyzer/selector-of-features/selector-of-features.component';
import { TrackCollectionChartComponent } from './components/track-collection-chart/track-collection-chart.component';
import { CollectionOfAlbumsAndPlaylistComponent } from './components/collection-of-albums-and-playlist/collection-of-albums-and-playlist.component';
import { TrackAnalyzerInfoModalComponent } from './components/track-analyzer-info-modal/track-analyzer-info-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        NumbersDuelComponent,
        SidebarComponent,
        OptionSidebarComponent,
        HomeComponent,
        ArtistHeaderComponent,
        BarsComparisionComponent,
        SongsPlaylistComponent,
        SongComponent,
        ArtistSearchComponent,
        SearchHeaderComponent,
        MainTitleComponent,
        BarsDataComponent,
        DurationFormatPipe,
        SearchAlbumsPlaylistsComponent,
        ItemHandlerComponent,
        TrackAnalyzerComponent,
        SelectorOfFeaturesComponent,
        TrackCollectionChartComponent,
        CollectionOfAlbumsAndPlaylistComponent,
        TrackAnalyzerInfoModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [DecimalPipe, DurationFormatPipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
