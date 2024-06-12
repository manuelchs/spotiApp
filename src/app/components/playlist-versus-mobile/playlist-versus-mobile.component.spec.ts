import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistVersusMobileComponent } from './playlist-versus-mobile.component';

describe('PlaylistVersusMobileComponent', () => {
  let component: PlaylistVersusMobileComponent;
  let fixture: ComponentFixture<PlaylistVersusMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistVersusMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistVersusMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
