import pool from '../config/database.js'


export const selectBook = (req,res) => {
    const query = 'SELECT * FROM books';

    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const data = results.map((result) => ({val : `${result.title} - ${result.author}`, id : result.id}))
        res.status(200).json(data);
    });

}