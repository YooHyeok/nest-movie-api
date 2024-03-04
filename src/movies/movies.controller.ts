import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
  @Get('/param')
  getReq(@Query('data') data: string) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
  @Get('/:data')
  getParam(@Param('data') data: string) {
    console.log(data);
    return `This will return one movie with the id: ${data}`;
  }
  @Post()
  create() {
    return 'This will create a movie';
  }
  @Delete('/:data')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }
  @Patch(`/:id`)
  patch(@Param('id') movieId: string) {
    return `This will patch a movie with the id: ${movieId}`;
  }
}
