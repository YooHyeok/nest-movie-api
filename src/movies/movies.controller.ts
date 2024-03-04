import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }
  @Get('/search')
  getReq(@Query('data') data: string) {
    return `This will return one movie with the id: ${data}`;
  }
  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }
  @Post()
  create(@Body() movieData: object) {
    console.log(movieData);
    return this.moviesService.create(movieData);
  }
  @Delete('/:data')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }
  @Patch(`/:id`)
  patch(@Param('id') movieId: string, @Body() updateData: object) {
    console.log(updateData);
    return this.moviesService.update(movieId, updateData);
  }
}
