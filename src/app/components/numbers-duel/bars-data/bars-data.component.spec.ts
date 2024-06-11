import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsDataComponent } from './bars-data.component';

describe('BarsDataComponent', () => {
  let component: BarsDataComponent;
  let fixture: ComponentFixture<BarsDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
