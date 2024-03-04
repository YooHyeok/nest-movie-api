# NestJS
NodeJS 위에서 작동하는 백엔드 프레임워크이다.   
정확하게는 express 위에서 동작하는것이라고 말할 수 있겠다.    


다른 NodeJS 프레임워크에는 없는 `구조`를 가지고 있다.

예를들어 express는 URL, 컨트롤러, 템플릿, 미들웨어 코드 구조에 대한 자유도를 가지고 있다.

반면 NextJS는 구조적 순서와 룰이 있다.    
따라서 큰 규모의 백엔드를 쉽게 만들수 있다.   

100% Typescript 기반이며, nodejs Application을 빌드하는데 매우 유용하다.    
객체지향, 함수형, 심지어 함수반응형 프로그래밍의 요소도 일부 사용한다.    

위와같이 NestJS는 아주 좋은 아키텍처와 구조를 가지고 있기 때문에 기업 프로젝트에 적합하다.    


<br>

## *요구 사항*
 - **NodeJS**
 - **VSCODE**
 - Insomnia Core (Rest 클라이언트)


<br>

# 프로젝트 셋업 
- `@nestjs/cli` Global install
  cli를 통해 새 프로젝트를 생성할 수 잇게 해준다.
  ```bash
  > npm install -g @nestjs/cli
  ```
- nest 프로젝트 생성
  ```bash
  > nest new
  ```
- 개발 서버 구동
  ```bash
  > npm run start:dev
  ```

<br>

# *Decorator*
Runtime에만 동작하는 일종의 함수로 ES5부터 지원하며, ECMAScript 표준의 proposal중 하나로 등록되어 있다.   

<br>

### *ECMAScript Proposal*
새로운 기능이나 변경사항에 대한 초기 제안을 뜻한다.   

즉, 일단 기능으로 등록되어 있으나 표준화 되지 않았으며, 표준화에 대해 미정인 상태이다.

본문으롣 돌아와 Decorator는 Class, Method, class Field에 적용이 가능하다.   
또한 여러개의 Decorator를 중첩해서 사용할 수 있다.  
Java의 Annotation과 큰 차이가 없으나, 차이점이 있다면 decorator는 Runtime에서만 역할을 한다.    
Java의 Annotation에는 @Retention이라는게 있어 Compiler에게만 보이고 runtime에는 없어지게 하거나 runtime에도 살아남아서 jvm에 의해 참조할 수 있게 할 수도 있다.    
Javascript는 정적인 타입(동적 타입이라 타입스크립트를 쓴다.)이 없기 때문에 애초에 Annotaion처럼 Compile time에 기능을 할 수 는 없다.(Typescript를 도입해도 그렇다.)   
이와 같은 측면에서는 runtime에서만 활용될 수 있는 annotion이라고도 볼 수 있다.

# *Next JS의 Decorator*
 - `@Module()`
 - `@Controller()`
 - `@Get()` / `@Post()`
 - `@Injectable`

<br>

# *Module이란?*
애플리케이션의 일부분으로 하나의 기능을 하는 앱인것이다.    
예를들어, 인증을 담당하는 애플리케이션이 있다면, Users모듈이 될것이다.   
다른 예로 인스타그램 앱을 만든다고 가정해보면, Photos 모듈 혹은 Videos모듈이 필요할것이다.    
app module은 전체에 해당하는 루트 모듈이다.   

app module에 선언된 `@Module()` Decorator함수에는 Controllers와 providers 속성이 존재한다.   
Controller가 하는 일은 기본적으로 URL을 가져오고 함수를 실행하는것이다.   
nodeJS에서는 URL을 가져오고 함수를 실행하는 express의 라우터 같은 존재이다.   

<br>

# *Get() - Decorator*
Controller의 `@Get()` Decorator 함수가 바로 express의 get 라우터와 같은 역할을 한다.    

```ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('/hello')
  sayHello(): string {
    return `Hello Everyone~`;
  }
}
```
위 코드에 의해 `/hello` 라는 URL 요청이 NestJS 서버에 오면, Hello Everyone이라는 문자열을 응답으로 반환한다.

```js
import express from "express"

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Everyone~")
})

/* 혹은 */

const router = app.Router();
const helloHandler = router.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/hello', helloHandler);

```

# *Controller & Service*
NestJS는 Controller와 비즈니스로직을 구분한다.    
Controller는 단순히 URL을 가져와 함수를 실행하는 역할을 할 뿐이다.    
나머지 비즈니스로직은 서비스로 간다.    
서비스는 실제 기능을 가지는 부분이다.   
Controller클래스의 생성자함수에 정의된 **Service에 들어가보면 새로운 class를 볼 수 있다.    
해당 class에는 비즈니스 로직을 하는 간단한 function이 존재한다.   
즉, 특정 URL 요청이 들어오면 Controller에서 해당 URL과 일치하는 함수를 매핑하고, 비즈니스 로직을 수행할 Service Class로부터 함수를 호출하여 반환받은 값을 해당 요청에 대한 응답으로 반환한다.   
Service Class에서 호출되는 함수 내에는 주로 데이터베이스에 접근하여 데이터를 추출한다.    

# *Controller 생성 (Nest-cli)*

nset CLI 관련 Comands 출력 명령어
```bash
> nest
```

아래와 같이 controller에 대한 alias와 기능 도메인명을 g(generate)와 함께 입력한다.
```bash
> nest g co [도메인명]
```
`/src/도메인명/` 경로로   
**`[도메인명].controller.ts`** | **`[도메인명].controller.spec.ts`**  파일이 생성된다.

<br>

# *@Controller() - Decorator*
관계있는 라우터를 그룹화 해준다.    
매개변수로 지정한 string값이 해당 컨트롤러의 최상위 Entry Point URL에 적용된다.   

# *@Param() - Decorator*
Spring의 Path-Variable 방식과 동일하다.

```js
import { Controller, Get, Param } from '@nestjs/common';
@Controller()
export class MoviesController {
  @Get("/:data")
  getParam(@Param() data: string) {
    console.log(data);
    return `This will return one with the id: ${data}`;
  }
}
```

`@Get('/:data')`와 같이 지정하고
`@Param()` 매개변수없이 지정하면 {data: value}형태로 값이 들어온다.   
즉, @Get Decorator에 등록한 파라미터 이름이 object의 property로 적용된다.   
```js
import { Controller, Get, Param } from '@nestjs/common';
@Controller()
export class MoviesController {
  @Get("/:data")
  getParam(@Param('data') data: string) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
}
```
`@Param('data')` 와 같이 매개변수를 지정하면 직접 접근이 가능해진다.

# *@Query() - Decorator*
일반적인 Web URL의 Query String 형태의 데이터를 추출한다.   
사용법은 @Param과 거의 유사하다.   

```js
import { Controller, Get, Query } from '@nestjs/common';
@Controller()
export class MoviesController {
  @Get("/:data")
  getParam(@Query() query: string) {
    console.log(query.data);
    return `This will return one with the id: ${query.data}`;
  }
}
```

`@Get('/:data')`와 같이 지정하고    
`@Query()` 매개변수없이 지정하면 {data: value}형태로 값이 들어온다.   
즉, @Get Decorator에 등록한 파라미터 이름이 object의 property로 적용된다.   
```js
import { Controller, Get, Query } from '@nestjs/common';
@Controller()
export class MoviesController {
  @Get("/:data")
  getParam(@Query('data') data: string) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
}
```
`@Param('data')` 와 같이 매개변수를 지정하면 직접 접근이 가능해진다.    

한가지 주의할 점은 선언 순서이다.    
만약 Query Parameter 방식을 동일한 Controller에서 진행한다면, 먼저 선언해줘야한다.   

```js
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get('/:data')
  getParam(@Param('data') data: string) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
  @Get('/param')
  getReq(@Query('data') data) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
}
```

예를들어 위와같이 `@Get('/:data')` 라우팅 함수가 존재하고 `/param?data=1234` 으로 요청을 한다면 `@Get('/:data')` 함수에 핸들러 매핑 되어버린다.   
라우터가 경로를 해석할 때 먼저 일치하는 경로에 대한 핸들러를 실행하기 때문이다.   

```js
import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get('/param')
  getReq(@Query('data') data) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
  @Get('/:data')
  getParam(@Param('data') data: string) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
}
```

# *@Body() - Decorator*
POST방식에서 Form 데이터 혹은 JSON으로 넘긴 데이터를 추출하는 데코레이터 메소드이다.

# *Service 생성 (Nest-cli)*
```bash
> nest g s [도메인명]
```
`/src/도메인명/` 경로로   
**`[도메인명].service.ts`** | **`[도메인명].service.spec.ts`**  파일이 생성된다.

# *IOC - @Injectable() & Constructor*

- ## `@Injectable`
  ```ts
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class MoviesService {}
  ```
  주입할 Provider 즉, Service 클래스의 클래스레벨에 @Injectable() 데코레이터를 선언하면
  Nest IOC 컨테이너가 해당 프로바이더를 관리할 수 있게 된다.    

  이는 Spring에서의 Bean과 같은 원리이다.   

    주입 받을 곳(Service라면 Controller)에는 주입 받을 프로바이더의 토큰 객체를 생성자 주입 방식으로 구현한다.   
    (만약 모듈에 토큰(bean이름)과, 객체 둘을 등록하면 둘을 연결시켜준다)

- ## `app.module.ts`
  ```ts
  import { Module } from '@nestjs/common';
  import { MoviesController } from './movies/movies.controller';
  import { MoviesService } from './movies/movies.service';

  @Module({
    imports: [],
    controllers: [MoviesController],
    providers: [{
        provide: 'MoviesService', // MoviesService token
        useClass: MoviesService, // MoviesService 클래스
      },],
  })
  export class AppModule {}
  ```
- ## `movies.controller.ts`

  Controller에서 아래와 같이 생성자를 통해 Token객체를 의존성 주입 한다.
  ```ts
  import { Controller, Inject } from '@nestjs/common';
  @Controller('movies')
  export class MoviesController {
    // constructor(@Inject('MoviesService') private readonly moviesService: MoviesService) {} //@Inejct 생략 가능
    constructor(private readonly moviesService: MoviesService) {}
  }
  ```
  이때, @Inject()는 생략이 가능하다.
