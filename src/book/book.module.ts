import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Book } from './entities/book.entity';
import { Author } from 'src/author/entities/author.entity';

@Module({
  imports:[MikroOrmModule.forFeature([Book,Author])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
