import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersDuelComponent } from './numbers-duel.component';

describe('NumbersDuelComponent', () => {
  let component: NumbersDuelComponent;
  let fixture: ComponentFixture<NumbersDuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumbersDuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumbersDuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
