import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreweddingComponent } from './prewedding.component';

describe('PreweddingComponent', () => {
  let component: PreweddingComponent;
  let fixture: ComponentFixture<PreweddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreweddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreweddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
