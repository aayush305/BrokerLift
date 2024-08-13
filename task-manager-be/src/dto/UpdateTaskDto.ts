import { IsNotEmpty, IsBoolean, IsMongoId } from 'class-validator';

export class UpdateTaskDto {
  @IsBoolean()
  @IsNotEmpty()
  readonly completed: boolean;
}
