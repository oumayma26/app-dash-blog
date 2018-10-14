import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderblogComponent } from './headerblog.component';

describe('HeaderblogComponent', () => {
  let component: HeaderblogComponent;
  let fixture: ComponentFixture<HeaderblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
