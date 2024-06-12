import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackAnalyzerInfoModalComponent } from './track-analyzer-info-modal.component';

describe('TrackAnalyzerInfoModalComponent', () => {
  let component: TrackAnalyzerInfoModalComponent;
  let fixture: ComponentFixture<TrackAnalyzerInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackAnalyzerInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackAnalyzerInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
