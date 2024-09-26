import { TestBed } from '@angular/core/testing';

import { AuthenticatioEmailService } from './authentication-email.service';

describe('AuthenticatioEmailService', () => {
  let service: AuthenticatioEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticatioEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
