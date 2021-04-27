import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMetacogComponent } from './about-metacog.component';

describe('AboutMetacogComponent', () => {
  let component: AboutMetacogComponent;
  let fixture: ComponentFixture<AboutMetacogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMetacogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMetacogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
