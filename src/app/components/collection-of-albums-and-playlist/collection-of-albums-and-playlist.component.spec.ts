import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOfAlbumsAndPlaylistComponent } from './collection-of-albums-and-playlist.component';

describe('CollectionOfAlbumsAndPlaylistComponent', () => {
  let component: CollectionOfAlbumsAndPlaylistComponent;
  let fixture: ComponentFixture<CollectionOfAlbumsAndPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionOfAlbumsAndPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionOfAlbumsAndPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
