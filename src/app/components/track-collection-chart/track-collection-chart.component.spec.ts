import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCollectionChartComponent } from './track-collection-chart.component';

describe('TrackCollectionChartComponent', () => {
  let component: TrackCollectionChartComponent;
  let fixture: ComponentFixture<TrackCollectionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackCollectionChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackCollectionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
