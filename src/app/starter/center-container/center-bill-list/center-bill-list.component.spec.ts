import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBillListComponent } from './center-bill-list.component';

describe('CenterBillListComponent', () => {
  let component: CenterBillListComponent;
  let fixture: ComponentFixture<CenterBillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterBillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterBillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
