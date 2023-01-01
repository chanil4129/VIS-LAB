import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarmaTestBasicComponent } from './karma-test-basic.component';

describe('KarmaTestBasicComponent', () => {
  let component: KarmaTestBasicComponent;
  let fixture: ComponentFixture<KarmaTestBasicComponent>;
  let karmatestbasiccomponent:KarmaTestBasicComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarmaTestBasicComponent ],
      providers:[KarmaTestBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarmaTestBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    karmatestbasiccomponent=TestBed.get(KarmaTestBasicComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fun',()=>{
    it('should return hello world',()=>{
      expect(karmatestbasiccomponent.fun()).toEqual('hello world');
    });
  });
});
