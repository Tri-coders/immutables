import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyroomComponent } from './studyroom.component';

describe('StudyroomComponent', () => {
  let component: StudyroomComponent;
  let fixture: ComponentFixture<StudyroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudyroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
