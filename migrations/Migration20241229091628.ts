import { Migration } from '@mikro-orm/migrations';

export class Migration20241229091628 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "author" ("id" serial primary key, "name" varchar(255) not null, "bio" varchar(255) null);`);

    this.addSql(`create table "book" ("id" serial primary key, "title" varchar(255) not null, "published_at" timestamptz not null, "author_id" int not null);`);

    this.addSql(`alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "book" drop constraint "book_author_id_foreign";`);

    this.addSql(`drop table if exists "author" cascade;`);

    this.addSql(`drop table if exists "book" cascade;`);
  }

}
