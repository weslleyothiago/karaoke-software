import { TestBed } from '@angular/core/testing';

import { AuthenticationEmailService } from './authentication-email.service';

describe('AuthenticatioEmailService', () => {
  let service: AuthenticationEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
