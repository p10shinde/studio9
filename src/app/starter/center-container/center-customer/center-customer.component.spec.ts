import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterCustomerComponent } from './center-customer.component';

describe('CenterCustomerComponent', () => {
  let component: CenterCustomerComponent;
  let fixture: ComponentFixture<CenterCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
