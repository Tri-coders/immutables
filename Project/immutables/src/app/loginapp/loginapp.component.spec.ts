import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginappComponent } from './loginapp.component';

describe('LoginappComponent', () => {
  let component: LoginappComponent;
  let fixture: ComponentFixture<LoginappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
