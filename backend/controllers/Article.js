import db from '../database/db';

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
}