import { PartialType } from '@nestjs/swagger';
import { CreateSubtagDto } from './create-subtag.dto';

export class UpdateSubtagDto extends PartialType(CreateSubtagDto) {}
