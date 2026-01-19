import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Author } from './entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Author,Book])],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports:[AuthorService]
})
export class AuthorModule {}
