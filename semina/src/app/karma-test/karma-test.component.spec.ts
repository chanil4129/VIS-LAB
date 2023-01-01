import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarmaTestComponent } from './karma-test.component';

describe('KarmaTestComponent', () => {
  let component: KarmaTestComponent;
  let fixture: ComponentFixture<KarmaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarmaTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarmaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
