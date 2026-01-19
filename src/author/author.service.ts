import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly em: EntityManager) {}

  async create(data: CreateAuthorDto): Promise<Author> {
    const author = this.em.create(Author, {
      name: data.name,
      bio: data.bio,
    });

    await this.em.persistAndFlush(author);
    return author;
  }

  async findAll(): Promise<Author[]> {
    return this.em.find(
      Author,
      { deletedAt: null },
      { populate: ['books'] },
    );
  }


  async findOne(id: number): Promise<Author | null> {
    return this.em.findOne(
      Author,
      { id, deletedAt: null },
      { populate: ['books'] },
    );
  }

 
  async update(id: number, data: UpdateAuthorDto): Promise<Author | null> {
    const author = await this.findOne(id);
    if (!author) return null;

    this.em.assign(author, data);
    await this.em.flush();

    return author;
  }


  async remove(id: number): Promise<void> {
    const author = await this.findOne(id);
    if (!author) return;

    author.deletedAt = new Date();
    await this.em.flush();
  }
}
