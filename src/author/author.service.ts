import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { EntityManager } from '@mikro-orm/postgresql';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly em: EntityManager) {}

  async create(data: CreateAuthorDto): Promise<Author> {
    const author = this.em.create(Author, data);
    await this.em.persistAndFlush(author);
    return author;
  }

  async findAll(): Promise<Author[]> {
    return this.em.find(Author, {},{populate:['books']});
  }

  async findOne(id: number): Promise<Author | null> {
    return this.em.findOne(Author, { id },{populate:['books']});
  }

  async update(id: number, data: UpdateAuthorDto): Promise<Author | null> {
    const author = await this.findOne(id);
    if (!author) return null;

    Object.assign(author, data);
    await this.em.persistAndFlush(author);
    return author;
  }

  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    if (author) {
      await this.em.removeAndFlush(author);
    }
  }
}
