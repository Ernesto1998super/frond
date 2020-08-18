import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalityComponent } from './update-modality.component';

describe('UpdateModalityComponent', () => {
  let component: UpdateModalityComponent;
  let fixture: ComponentFixture<UpdateModalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateModalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
