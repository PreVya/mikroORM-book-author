import { defineConfig, Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entities/book.entity';

const config: Options = {
  entities: [Book, Author],
  dbName: 'neondb',
  driver: PostgreSqlDriver,
  clientUrl: 'postgresql://neondb_owner:rp7QNPFUjfZ8@ep-curly-mountain-a5acyw8y.us-east-2.aws.neon.tech/neondb?sslmode=require',
  debug: true,
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    },
  },
  migrations: {
    path: './migrations',
    glob: '!(*.d).{js,ts}',
  },
};

export default config;
