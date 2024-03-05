import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

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
   * it : individual test의 줄임말
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // 배열리턴여부확인
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // Movie 객체리턴여부확인
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(1); // 데이터 추가된적이 없으므로.. Not Found Exception
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie With ID: 1 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length; // 제거 전 전체조회
      service.deleteOne(1); // create 한 Movie객체 제거
      const afterDelete = service.getAll().length; // 제거 후 전체조회
      expect(afterDelete).toBeLessThan(beforeDelete); // 제거후가 제거전보다 작다.
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(1); // Movies가 비어있음...
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length; // 추가 전 전체조회
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length; // 추가 후 전체조회
      expect(afterCreate).toBeGreaterThan(beforeCreate); // 추가 후가 추가 전보다 크다.
    });
  });
});
