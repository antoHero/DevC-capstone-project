import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Successfully connected to the database');
});

/**
 * Create User Table
 */

 const createUserTable = () => {
     const queryText = 
     `CREATE TABLE IF NOT EXISTS 
     users (
        ID SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(100) NOT NULL,
        jobRole VARCHAR(100) NOT NULL,
        department VARCHAR(100) NOT NULL,
        address VARCHAR(100) NOT NULL
    )`;

    pool.query(queryText)
    .then(
        (res) => {
            console.log(res);
            pool.end();
        }
    )
    .catch(
        (err) => {
            console.log(err);
            pool.end();
        }
    );
 }

 /**Create article table 
  * 
 */

 const createArticleTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS 
      article (
      ID SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      article TEXT NOT NULL,
      datePosted timestamp,
      user_id SERIAL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;

  pool.query(queryText)
  .then(
      (res) => {
          console.log(res);
          pool.end();
      }
  )
  .catch(
      (err) => {
          console.log(err);
          pool.end();
      }
  );
}

/**
 * Create ArticleComments table
 */

 const createArticleCommentsTable = () => {
     const queryText = 
     `CREATE TABLE IF NOT EXISTS
     articleComments(
         ID SERIAL PRIMARY KEY,
         comment VARCHAR(225) NOT NULL,
         user_id UUID,
         article_id UUID,
         datePosted timestamp,
         FOREIGN KEY (user_id, article_id) REFERENCES users(id), article(id) ON DELETE CASCADE
     )`;

     pool.query(queryText)
     .then(
         (res) => {
             console.log(res);
             pool.end();
         }
     )
     .catch(
         (err) => {
             console.log(err);
             pool.end();
         }
     )
 }