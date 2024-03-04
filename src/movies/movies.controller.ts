import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
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
