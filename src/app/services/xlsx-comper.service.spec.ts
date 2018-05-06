import { TestBed, inject } from '@angular/core/testing';

import { XlsxComperService } from './xlsx-comper.service';

describe('XlsxComperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XlsxComperService]
    });
  });

  it('should be created', inject([XlsxComperService], (service: XlsxComperService) => {
    expect(service).toBeTruthy();
  }));
});
