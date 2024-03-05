import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: number): Movie {
    // return this.movies.find((movie) => movie.id === parseInt(id));
    // const movie = this.movies.find((movie) => movie.id === +id); // + 기호를 통해 id를 number로 타입변경
    const movie = this.movies.find((movie) => movie.id === id); // + 기호를 통해 id를 number로 타입변경
    if (!movie) {
      throw new NotFoundException(`Movie With ID: ${id} not found.`); // Nest JS에서 지원하는 HttpException의 확장된 Excption
    }
    return movie;
  }
  deleteOne(id: number): boolean {
    this.getOne(id); // 조회되는지 여부 파악 안되면 NotFoundException에러 발생됨
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }
  create(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOne(id); // 조회되는지 여부 파악 안되면 NotFoundException에러 발생됨
    this.deleteOne(id);
    this.movies.push({
      ...movie, // 기존 데이터 전개
      ...updateData, // 신규 데이터로 변경
    });
  }
}
