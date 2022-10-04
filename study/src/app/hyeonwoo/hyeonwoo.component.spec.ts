import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyeonwooComponent } from './hyeonwoo.component';

describe('HyeonwooComponent', () => {
  let component: HyeonwooComponent;
  let fixture: ComponentFixture<HyeonwooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyeonwooComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyeonwooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
