import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Hall2Component } from './hall2.component';

describe('Hall2Component', () => {
  let component: Hall2Component;
  let fixture: ComponentFixture<Hall2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Hall2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Hall2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
