
const { pool } = require('./database/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const Gif = require('./controllers/Gif');
const User = require('./controllers/User');
const Article = require('./controllers/Article');
const auth = require('./middleware/auth');
const multer = require('./middleware/multer-config');
dotenv.config();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.get('/', (req, res) => {
    res.send({
        message: 'Endpoint working'
    });
});

app.post('api/v1/gifs', auth, multer, Gif.addGif);
app.post('api/v1/articles', auth, Article.addArticle);
app.get('api/v1/gifs', auth, Gif.viewAllGifs);
app.get('api/v1/articles', auth, Article.viewAllArticles);
app.get('api/v1/users/', auth, User.getUsers);
app.get('api/v1/gifs/:id', auth, Gif.readOne);
app.get('api/v1/articles/:id', auth, Article.readOneArticle);
app.put('api/v1/articles/:id', auth, Article.updateArticle);
app.delete('api/v1/gifs/:id', auth, Gif.deleteGif);
app.delete('api/v1/articles/:id', auth, Article.deleteArticle);
app.post('api/v1/users', auth, User.create);
app.post('api/v1/users/login', auth, User.signin);
app.post('api/v1/gifs/:id', auth, Gif.commentOnGif);
app.post('api/v1/articles/:id', auth, Article.commentOnArticle);


module.exports = app;
