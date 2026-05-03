import { TestBed } from '@angular/core/testing';

import { UserWatchlistService } from './user-watchlist.service';

describe('UserWatchlistService', () => {
  let service: UserWatchlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserWatchlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
