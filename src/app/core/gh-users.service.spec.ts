import { TestBed } from '@angular/core/testing';

import { GhUsersService } from './gh-users.service';

describe('GhUsersService', () => {
  let service: GhUsersService;

  const httpMock = {
    get: jest.fn()
  } as any;

  beforeEach(() => {
    service = new GhUsersService(httpMock);
  });

  it('should be return a user', () => {
    const expectedUser = 'el user' as any;
    httpMock.get.mockReturnValue(expectedUser);
    const user = service.searchUser('test')
    expect(user).toBe(expectedUser);
  });
});
