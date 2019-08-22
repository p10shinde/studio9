import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterReportComponent } from './center-report.component';

describe('CenterReportComponent', () => {
  let component: CenterReportComponent;
  let fixture: ComponentFixture<CenterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
