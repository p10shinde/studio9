import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBillAdd2Component } from './center-bill-add2.component';

describe('CenterBillAdd2Component', () => {
  let component: CenterBillAdd2Component;
  let fixture: ComponentFixture<CenterBillAdd2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterBillAdd2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterBillAdd2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
