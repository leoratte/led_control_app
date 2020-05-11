import { TestBed } from '@angular/core/testing';

import { SelectLedService } from './select-led.service';

describe('SelectLedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectLedService = TestBed.get(SelectLedService);
    expect(service).toBeTruthy();
  });
});
