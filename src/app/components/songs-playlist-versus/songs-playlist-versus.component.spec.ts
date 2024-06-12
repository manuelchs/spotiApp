import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsPlaylistVersusComponent } from './songs-playlist-versus.component';

describe('SongsPlaylistVersusComponent', () => {
  let component: SongsPlaylistVersusComponent;
  let fixture: ComponentFixture<SongsPlaylistVersusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongsPlaylistVersusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongsPlaylistVersusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
