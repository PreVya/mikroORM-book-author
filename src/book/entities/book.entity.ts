import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Author } from "src/author/entities/author.entity";

@Entity()
export class Book {
    @PrimaryKey()
    id!:number;

    @Property()
    title: string;

    @Property()
    publishedAt: Date;

    @ManyToOne(() => Author,{nullable:true})
    author: Author;
}
