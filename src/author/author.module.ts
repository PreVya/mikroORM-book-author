import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Author } from './entities/author.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
