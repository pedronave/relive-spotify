import { TestBed } from '@angular/core/testing';

import { TopTracksService } from './top-tracks.service';

describe('TopTracksService', () => {
  let service: TopTracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopTracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
