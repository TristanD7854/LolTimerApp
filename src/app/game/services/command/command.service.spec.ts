import { TestBed } from '@angular/core/testing';

import { CommandService } from './command.service';

describe('CommandService', () => {
  let service: CommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandService);
  });

  // todo : lots of tests for getTimeOfUse

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
