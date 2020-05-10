import { TestBed } from '@angular/core/testing';

import { SpotifyAuthGuard } from './spotify-auth.guard';

describe('SpotifyAuthGuard', () => {
  let guard: SpotifyAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpotifyAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
