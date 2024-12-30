import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { EntityManager } from '@mikro-orm/core';
import { Book } from './entities/book.entity';
import { Author } from 'src/author/entities/author.entity';

@Injectable()
export class BookService {
  constructor(private readonly em: EntityManager) {}

  async create(data: CreateBookDto): Promise<Book> {
    // const author = await this.em.findOne(Author,data.author);
    // if (!author) throw new Error('Author not found');

    // const book = this.em.create(Book, {
    //   ...data,
    //   publishedAt: new Date(data.publishedAt),
    //   author,
    // });
    // const book = this.em.create(Book, CreateBookDto);
    // await this.em.persistAndFlush(book);
    // return book;

    const book = this.em.create(Book, data);
    await this.em.persistAndFlush(book);
    return book;
  }

  async findAll(): Promise<Book[]> {
    return this.em.find(Book,{},{populate:['author']});
  }

  async findOne(id: number): Promise<Book | null> {
    return this.em.findOne(Book, { id },{populate:['author']});
  }

  async update(id: number, data: UpdateBookDto): Promise<Book | null> {
    // const book = await this.findOne(id);
    // if (!book) return null;

    // if (data.author) {
    //   const author = await this.em.findOne(Author,data.author);
    //   if (!author) throw new Error('Author not found');
    //   book.author = author;
    // }

    // Object.assign(book, {
    //   ...data,
    //   publishedAt: data.publishedAt ? new Date(data.publishedAt) : book.publishedAt,
    // });

    // await this.em.persistAndFlush(book);
    // return book;

    const book = await this.findOne(id);
    if (!book) return null;

    Object.assign(book, data);
    await this.em.persistAndFlush(book);
    return book;
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    if (book) {
      await this.em.removeAndFlush(book);
    }
  }
}