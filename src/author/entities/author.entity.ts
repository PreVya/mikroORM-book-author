import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Book } from "src/book/entities/book.entity";

@Entity()
export class Author {
    @PrimaryKey()
    id!:number;

    @Property()
    name!: string;

    @Property({ nullable: true })
    bio: string;

    @OneToMany(() => Book, (book) => book.author)
    books = new Array<Book>();
}
