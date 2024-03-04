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
import { CreateMovieDTO } from "./dto/create-movie.dto";
import { UpdateMovieDTO } from './dto/update-movie.dto';

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
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }
  @Post() // Post 성공시 201코드 반환
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }
  @Delete('/:data')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }
  @Patch(`/:id`)
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDTO) {
    console.log(updateData);
    return this.moviesService.update(movieId, updateData);
  }
}
