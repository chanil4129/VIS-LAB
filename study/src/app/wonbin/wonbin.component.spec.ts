import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WonbinComponent } from './wonbin.component';

describe('WonbinComponent', () => {
  let component: WonbinComponent;
  let fixture: ComponentFixture<WonbinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WonbinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WonbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
