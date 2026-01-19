import { Author } from "src/author/entities/author.entity";

export class CreateBookDto {
    id!:number;
    title:string;
    authorId:number;
    price:number;
    deletedAt:Date;
    publishedAt: Date;
}
