import pool from '../config/database.js'


export const booksCount = (req,res) => {
    const query = 'SELECT COUNT(*) AS count FROM books';

    let booksCount = 0

    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        booksCount = results[0].count;
        res.status(200).json(booksCount);
    });

}