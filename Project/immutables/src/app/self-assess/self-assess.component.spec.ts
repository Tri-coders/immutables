import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessComponent } from './self-assess.component';

describe('SelfAssessComponent', () => {
  let component: SelfAssessComponent;
  let fixture: ComponentFixture<SelfAssessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAssessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
