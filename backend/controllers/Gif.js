import db from '../database/db';

const Gif = {

    //create or add a gif
    async addGif(req, res) {
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

    //employees can delete their gif images
    async deleteGif(req, res) {
        const deleteQuery = 'DELETE * FROM gif WHERE id=$1 AND user_id=$2 returning *';
        try {
            const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).json({message: 'Oops Gif not found!'});
            }
            return res.status(200).json({message: 'Gif deleted successfully'});
        } catch(err) {
            return res.status(400).json({err});
        }
    },
    
}

module.exports = {Gif}