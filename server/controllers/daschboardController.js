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

export const BorrowedBooksCount = (req,res) => {
    const query = 'SELECT COUNT(*) AS count FROM borrowed_books';

    let borrowedBooksCount = 0

    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        borrowedBooksCount = results[0].count;
        res.status(200).json(borrowedBooksCount);
    });
}

export const notReturnedBooksCount = (req,res) => {
    const query = 'SELECT COUNT(*) AS count FROM borrowed_books WHERE is_returned = false';

    let notReturnedBooks = 0

    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        notReturnedBooks = results[0].count;
        res.status(200).json(notReturnedBooks);
    });
}