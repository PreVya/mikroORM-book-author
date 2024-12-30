import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import config from 'mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forRoot(config),AuthorModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
