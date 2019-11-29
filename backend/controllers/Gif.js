import db from '../database/db';

const Gif = {

    //create or add a gif
    async addArticle(req, res) {
        const createQuery = `INSERT INTO 
        gif(id, title, imageUrl, createdOn, user_id)
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

module.exports = {Gif}