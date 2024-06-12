import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemHandlerComponent } from './item-handler.component';

describe('ItemHandlerComponent', () => {
  let component: ItemHandlerComponent;
  let fixture: ComponentFixture<ItemHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
