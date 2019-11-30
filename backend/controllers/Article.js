const db = require('../database/db');

const Article = {
    async addArticle(req, res) {
        const createQuery = `INSERT INTO 
        article(id, title, article, datePosted, user_id)
        VALUES($1,$2,$3,$4,$5)
        returning *`;
        const values = [
            req.body.title,
            req.body.article,
            moment(new Date()),
            req.user.id
        ];

        try {
            const { rows } = await database.query(createQuery, values);
            return res.status(201).send(rows[0]);
        } catch(error){
            return res.status(400).send(error);
        }
    },
    async updateArticle(req, res) {
        const findOneArticle = 'SELECT * FROM article WHERE id=$1 AND user_id=$2';
        const updateQuery = `UPDATE article SET title=$1, article=$2,
        datePosted=$3 WHERE id=$4 AND user_id=$5 returning *`;
        try{ 
            const { rows } = await db.query(findOneArticle, [req.body.params, req.user.id]);
            if(!rows[0]) {
                return res.status(404).json({message: 'Oops Article does not exist!'});
            }
            const values = [
                req.body.title || rows[0].title,
                req.body.article || rows[0].article,
                moment(new Date()),
                req.params.id,
                req.user.id
            ];
            const result = await db.query(updateQuery, values);
            return res.status(201).json(result.rows[0]);
        } catch(err) {
            return res.status(400).json({error});
        }
    },
    async deleteArticle(req, res) {
        const deleteQuery = 'DELETE * FROM article WHERE id=$1 AND user_id=$2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if(!rows[0]){
                return res.status(404).json({message: 'Oops Article does not exist!'});
            }
            return res.status(200).json({message: 'Article deleted successfully'});
        } catch(err) {
            return res.status(400).json({err});
        }
    },
    async commentOnArticle(req, res) {
        const getOne = 'SELECT * FROM article WHERE id=$1 AND user_id=$2';
        const commentQuery = `INSERT INTO articleComments(id, comment,article_id,user_id,datePosted)
        VALUES($1,$2,$3,$4,$5) returning *`;
        try {
            const { rows } = await database.query(getOne, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).json({
                    message: 'Oops Article does not exist!'
                });
            }
            const values = [
                uuidv4(),
                req.body.comment,
                moment(new Date()),
                req.article.id,
                req.user.id,
                moment(new Date())
            ];

            const response = await database.query(commentQuery, values);
            return res.status(201).json({
                message: 'Successfully added comment'
            });
        } catch(error) {
            return res.status(400).send(error);
        }

    },
    async readOneArticle(req, res) {
        const readQuery = 'SELECT * FROM article WHERE id=$1 AND user_id=$2';
        try {
            const { rows } = await db.query(readQuery, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).json({message:'Oops Article does not exist!'});
            }
            return res.status(200).json(rows[0]);
        } catch(err) {
            return res.status(400).json({err});
        }
    },
    async viewAllArticles(req, res) {
        const queryText = 'SELECT * FROM article ORDER BY ASC';
        try{
            const { rows, rowCount } = await db.query(queryText);
            return res.status(200).json({rows, rowCount});
        } catch(err) {
            return res.status(400).json({err});
        }
    }
}

module.exports = Article;