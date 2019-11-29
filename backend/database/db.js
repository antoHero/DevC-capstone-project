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
        id SERIAL PRIMARY KEY,
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
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      article TEXT NOT NULL,
      datePosted timestamp,
      user_id UUID,
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
         id SERIAL PRIMARY KEY,
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

 /**
  * Create Gif table
  */

  const createGifTable = () => {
      const queryText = 
      `CREATE TABLE IF NOT EXISTS
      gif(
          id SERIAL PRIMARY KEY,
          title VARCHAR(225) NOT NULL,
          imageURL VARCHAR(225) NOT NULL,
          createdOn timestamp,
          user_id UUID,
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
          
        )
  }

  /**
   * create gif comment table
   */
  const createGifCommentsTable = () => {
    const queryText = 
    `CREATE TABLE IF NOT EXISTS
    gifComments(
        id SERIAL PRIMARY KEY,
        comment VARCHAR(225) NOT NULL,
        user_id UUID,
        gif_id UUID,
        datePosted timestamp,
        FOREIGN KEY (user_id, gif_id) REFERENCES users(id), gif(id) ON DELETE CASCADE
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

/**
 * Create all tables
 */

 const createAllTables = () => {
     createUserTable();
     createArticleTable();
     createArticleCommentsTable();
     createGifTable();
     createGifCommentsTable();

 }

 pool.on('remove', () => {
     console.log('Client removed');
     process.exit(0);
 });

 module.exports = {
     createUserTable,
     createArticleTable,
     createArticleCommentsTable,
     createGifTable,
     createGifCommentsTable,
     createAllTables
 };

 require('make-runnable');