import { IsString, IsBoolean, IsDateString, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  public userId: number;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsBoolean()
  public completed: boolean;

  @IsDateString()
  public due: Date;
}
