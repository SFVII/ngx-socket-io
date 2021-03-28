import { TestBed } from '@angular/core/testing';

import { SocketFrontUpdateService } from './socket-front-update.service';

describe('SocketFrontUpdateService', () => {
  let service: SocketFrontUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketFrontUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
