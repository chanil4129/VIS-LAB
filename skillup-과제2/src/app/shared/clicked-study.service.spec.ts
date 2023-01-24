import { TestBed } from '@angular/core/testing';

import { ClickedStudyService } from './clicked-study.service';

describe('ClickedStudyService', () => {
  let service: ClickedStudyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickedStudyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
