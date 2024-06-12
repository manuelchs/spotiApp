import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuelInfoModalComponent } from './duel-info-modal.component';

describe('DuelInfoModalComponent', () => {
  let component: DuelInfoModalComponent;
  let fixture: ComponentFixture<DuelInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuelInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuelInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
