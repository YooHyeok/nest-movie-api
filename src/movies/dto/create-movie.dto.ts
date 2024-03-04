import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true }) /* string배열의 모든 요소를 하나씩 검사함 */
  readonly genres: string[];
}
