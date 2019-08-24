import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterUserComponent } from './center-user.component';

describe('CenterUserComponent', () => {
  let component: CenterUserComponent;
  let fixture: ComponentFixture<CenterUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
