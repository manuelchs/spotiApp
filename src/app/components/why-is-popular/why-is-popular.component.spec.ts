import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyIsPopularComponent } from './why-is-popular.component';

describe('WhyIsPopularComponent', () => {
  let component: WhyIsPopularComponent;
  let fixture: ComponentFixture<WhyIsPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyIsPopularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyIsPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
