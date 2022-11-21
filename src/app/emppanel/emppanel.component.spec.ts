import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmppanelComponent } from './emppanel.component';

describe('EmppanelComponent', () => {
  let component: EmppanelComponent;
  let fixture: ComponentFixture<EmppanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmppanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmppanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
