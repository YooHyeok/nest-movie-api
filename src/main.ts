import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, /* Validation관련 decorator가 존재하지 않는 object라면 제거된 후 검증한다. */
      forbidNonWhitelisted: true, /* 화이트리스트에 존재하지 않다면 HttpException을 발생시켜 request 요청 자체를 차단한다. */
      transform : true, /* 파라미터를 컨트롤러에 선언한 타입으로 변환한다. */
    }),
  );
  await app.listen(3000);
}
bootstrap();
