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
    //employees can comment on other employees gif images
    async commentOnGif(req, res) {
        const getOne = 'SELECT * FROM gif WHERE id=$1 AND user_id=$2';
        const commentQuery = `INSERT INTO gifComments(id, comment,datePosted,gif_id,user_id)
        VALUES($1,$2,$3,$4,$5) returning *`;
        try {
            const { rows } = await database.query(getOne, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).json({
                    message: 'Oops Gif Post does not exist!'
                });
            }
            const values = [
                uuidv4(),
                req.body.comment,
                moment(new Date()),
                req.gif.id,
                req.user.id
            ];

            const response = await database.query(commentQuery, values);
            return res.status(201).json({
                message: 'Successfully added comment'
            });
        } catch(error) {
            return res.status(400).send(error);
        }

    },
    //employees can view specific gif posts
    async readOne(req, res) {
        const readQuery = 'SELECT * FROM artgificle WHERE id=$1 AND user_id=$2';
        try {
            const { rows } = await db.query(readQuery, [req.params.id, req.user.id]);
            if(!rows[0]) {
                return res.status(404).json({message:'Oops Gif does not exist!'});
            }
            return res.status(200).json(rows[0]);
        } catch(err) {
            return res.status(400).json({err});
        }
    },
    //employees can view all gifs, showing the most recent gif first
    async viewAllGifs(req, res) {
        const queryText = 'SELECT * FROM gif ORDER BY ASC';
        try{
            const { rows, rowCount } = await db.query(queryText);
            return res.status(200).json({rows, rowCount});
        } catch(err) {
            return res.status(400).json({err});
        }
    }
}

module.exports = {Gif}