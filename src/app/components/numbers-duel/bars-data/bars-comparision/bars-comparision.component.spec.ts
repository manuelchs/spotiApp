import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsComparisionComponent } from './bars-comparision.component';

describe('BarsComparisionComponent', () => {
  let component: BarsComparisionComponent;
  let fixture: ComponentFixture<BarsComparisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsComparisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarsComparisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
