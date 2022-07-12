import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTutorialComponent } from './material-tutorial.component';

describe('MaterialTutorialComponent', () => {
  let component: MaterialTutorialComponent;
  let fixture: ComponentFixture<MaterialTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
