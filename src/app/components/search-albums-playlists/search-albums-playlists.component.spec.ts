import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAlbumsPlaylistsComponent } from './search-albums-playlists.component';

describe('SearchAlbumsPlaylistsComponent', () => {
  let component: SearchAlbumsPlaylistsComponent;
  let fixture: ComponentFixture<SearchAlbumsPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAlbumsPlaylistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAlbumsPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
