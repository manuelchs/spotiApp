import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorOfFeaturesComponent } from './selector-of-features.component';

describe('SelectorOfFeaturesComponent', () => {
  let component: SelectorOfFeaturesComponent;
  let fixture: ComponentFixture<SelectorOfFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorOfFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorOfFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
