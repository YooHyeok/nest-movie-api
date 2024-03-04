import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

/**
 * NestJS Decorator 함수
 * 클래스에 함수 기능을 추가할 수 있다.
 * 클래스 위의 함수로써 클래스를 위해 작동된다.
 * 현재 클래스인 AppModule는 비어있으나 실질적인 코드는 @Module에 있다.
 */
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
