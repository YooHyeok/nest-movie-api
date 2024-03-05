import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { describe, it } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  /**
   * 실제 테스트 실행전 실행된다.
   */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  /**
   * individual test의 줄임말
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(5);
  });
});
