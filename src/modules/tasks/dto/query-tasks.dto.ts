import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.interface';

export class QueryTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus, {
    message: 'Status must be one of: OPEN, IN_PROGRESS, DONE',
  })
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}

