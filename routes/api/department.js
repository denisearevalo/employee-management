const router = require('inquirer').Router();
const db = require('../../db/connection')

router.get('/all', (req, res) => {
    const query = 'SELECT * FROM movies';

    db.query(query, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const query = 'INSERT INTO movies (movie_name) VALUES (?)';
    const params = req.body.title;

    db.query(query, params, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(result.insertId);
    });
});

router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM movies WHERE id = ?;';
    const params = req.params.id;

    db.query(query, params, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(result.affectedRows);
    });
});

//get movie with associated reviews
router.get('/:id', (req, res) => {
    const query = 'SELECT movie_name AS title, review FROM movies JOIN reviews ON movies.id=movie_id WHERE movies.id = ?'
    db.query(query, req.params.id, (err, result) => {
        if (err) res.status(500).json({ error: err.message });
        res.json(result)
    })
})

module.exports = router;