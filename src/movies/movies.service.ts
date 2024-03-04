import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: string): Movie {
    // return this.movies.find((movie) => movie.id === parseInt(id));
    return this.movies.find((movie) => movie.id === +id); // + 기호를 통해 id를 number로 타입변경
  }
  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }
  create(movieData: object) {
    console.log(movieData);
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    })
  }
}
