import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBillAddComponent } from './center-bill-add.component';

describe('CenterBillAddComponent', () => {
  let component: CenterBillAddComponent;
  let fixture: ComponentFixture<CenterBillAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterBillAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterBillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
