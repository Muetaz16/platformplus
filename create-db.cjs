const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Connect to default database
  password: 'admin123',
  port: 5432,
});

async function createDb() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL server.');
    await client.query('CREATE DATABASE newsplatform');
    console.log('Database newsplatform created successfully.');
  } catch (err) {
    if (err.code === '42P04') {
      console.log('Database newsplatform already exists.');
    } else {
      console.error('Error creating database:', err.message);
    }
  } finally {
    await client.end();
  }
}

createDb();
