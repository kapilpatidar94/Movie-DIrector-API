
const callMovie = require('./getFunctions');

app.get('/movies', (req, res) => {
    callMovie.getAllMovies().then((result) => {
        res.status(200).send(result);
    }).catch(() => {
        res.sendStatus(500);
    });
});

app.get('/movies/:movieid', (req, res) => {
    callMovie.getmoviesByID(req.params.movieid).then((result) => {
        (result.length > 0) ? res.status(200).send(result) : res.sendStatus(404);
    }).catch(() => {
        res.sendStatus(500);
    });
});
//  Delete movie by id
app.delete('/movies/:movieid', (req, res) => {
    callMovie.deleteMovie(req.params.movieid).then((data) => {
        if (data.affectedRows) { res.sendStatus(202); } else { res.sendStatus(404); }
    }).catch(() => {
        res.sendStatus(500);
    });
});
// Updating movie by id
app.put('/movies/:movieid', (req, res) => {
    const { body } = req;
    const dir = {
        title: body.title,
        description: body.description,
        runtime: body.runtime,
        genre: body.genre,
        rating: body.rating,
        metascore: body.metascore,
        votes: body.votes,
        gross: body.Gross_Earning_in_Mil,
        director: body.director,
        actor: body.actor,
        year: body.year,
    };
    callMovie.updateMovie(req.params.movieid, dir).then((data) => {
        if (data.affectedRows) {
            res.sendStatus(202);
        } else {
            res.sendStatus(404);
        }
    }).catch(() => {
        res.sendStatus(500);
    });
});

// Adding a new movie
app.post('/movies/', (req, res) => {
    const { body } = req;
    const dir = {

        title: body.title,
        description: body.description,
        runtime: body.runtime,
        genre: body.genre,
        rating: body.rating,
        metascore: body.metascore,
        votes: body.votes,
        gross: body.gross,
        director: body.director,
        actor: body.actor,
        year: body.year,
    };
    callMovie.addNewMovie(dir).then((data) => {
        res.send(`Last person added whose rank is: ${data.rank}`);
    }).catch(() => {
        res.sendStatus(500);
    });
});
