import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { Book } from './entities/book.entity';
import { Author } from 'src/author/entities/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly em: EntityManager) {}

  // CREATE — author must exist
  async create(data: CreateBookDto): Promise<Book> {
    const author = await this.em.findOne(Author, {
      id: data.authorId,
      deletedAt: null,
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const book = this.em.create(Book, {
      title: data.title,
      publishedAt: new Date(data.publishedAt),
      price: data.price,
      author,
    });

    await this.em.persistAndFlush(book);
    return book;
  }

  // READ ALL — exclude soft-deleted
  async findAll(): Promise<Book[]> {
    return this.em.find(
      Book,
      { deletedAt: null },
      { populate: ['author'] },
    );
  }

  // READ ONE — exclude soft-deleted
  async findOne(id: number): Promise<Book | null> {
    return this.em.findOne(
      Book,
      { id, deletedAt: null },
      { populate: ['author'] },
    );
  }

  // UPDATE — cannot update deleted book
  async update(id: number, data: UpdateBookDto): Promise<Book | null> {
    const book = await this.em.findOne(Book, {
      id,
      deletedAt: null,
    });

    if (!book) return null;

    if (data.authorId) {
      const author = await this.em.findOne(Author, {
        id: data.authorId,
        deletedAt: null,
      });

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      book.author = author;
    }

    if (data.title !== undefined) book.title = data.title;
    if (data.price !== undefined) book.price = data.price;
    if (data.publishedAt !== undefined) {
      book.publishedAt = new Date(data.publishedAt);
    }

    await this.em.flush();
    return book;
  }

  // SOFT DELETE
  async remove(id: number): Promise<void> {
    const book = await this.em.findOne(Book, {
      id,
      deletedAt: null,
    });

    if (!book) return;

    book.deletedAt = new Date();
    await this.em.flush();
  }
}
