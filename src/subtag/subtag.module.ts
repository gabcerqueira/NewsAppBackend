import { Module } from '@nestjs/common';
import { SubtagService } from './subtag.service';
import { SubtagController } from './subtag.controller';
import { SubtagRepository } from './subtag.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Subtag, SubtagSchema } from './schema/subtag.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subtag.name, schema: SubtagSchema }]),
  ],
  controllers: [SubtagController],
  providers: [SubtagService, SubtagRepository],
  exports: [SubtagRepository],
})
export class SubtagModule {}
