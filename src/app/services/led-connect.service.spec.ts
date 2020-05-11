import { TestBed } from '@angular/core/testing';

import { LedConnectService } from './led-connect.service';

describe('LedConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LedConnectService = TestBed.inject(LedConnectService);
    expect(service).toBeTruthy();
  });
});
