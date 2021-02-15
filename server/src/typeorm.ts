import { createConnection } from 'typeorm';
import path from 'path';

export async function connect() {
  await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'password',
    database: 'test_db',
    entities: [
      path.join(__dirname, '../entity/**/**.ts')
    ]
  })
}
