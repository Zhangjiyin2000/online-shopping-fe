import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSoldItemsComponent } from './total-sold-items.component';

describe('TotalSoldItemsComponent', () => {
  let component: TotalSoldItemsComponent;
  let fixture: ComponentFixture<TotalSoldItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalSoldItemsComponent]
    });
    fixture = TestBed.createComponent(TotalSoldItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
