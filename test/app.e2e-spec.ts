import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeEach(async () => { /* 테스트간 독립적으로 적용된다. */
  beforeAll(async () => { /* 모든 테스트에 대해 적용된다. */
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]); // 데이터가 비어있다.
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201); // POST 성공시 201 코드 반환받는다.
    });

    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404); // 파라미터가 없음... = /movies에 매핑되는 DELETE 방식의 매핑함수가 없음
    });
  });

  describe('/movies:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200) // 위 POST 테스트에서 추가하고 삭제되지않음.
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/2')
        .expect(404)
    });
    it.todo('DELETE');
    it.todo('PATCH');
  });
});
