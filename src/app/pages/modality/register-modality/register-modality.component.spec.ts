import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModalityComponent } from './register-modality.component';

describe('RegisterModalityComponent', () => {
  let component: RegisterModalityComponent;
  let fixture: ComponentFixture<RegisterModalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterModalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
