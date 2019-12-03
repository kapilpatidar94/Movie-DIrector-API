const moviesTable = require('index');

const getAllMovies = () => new Promise((resolve, reject) => {
    moviesTable.findAll().then((data) => resolve(data)).catch((err) => reject(err));
});

// GET : Getting movies by id
const getmoviesByID = (movieid) => new Promise((resolve, reject) => {
    con.query(`select * from moviesdata where rank=${movieid}`, (err, data) => {
        if (err) {
            return reject(err);
        }
        return resolve(data);
    });
});

// POST method :Add movie
const addNewMovie = (movie) => new Promise((resolve, reject) => {
    moviesTable.create(movie).then((data) => resolve(data)).catch((err)=>reject(err));
    
});

// PUT method : Updating movie details by movie id
const updateMovie = (id, movie) => new Promise((resolve, reject) => {
    con.query(`update moviesdata set title='${movie.title}',description='${movie.description}',
      runtime=${movie.runtime},genre='${movie.genre}',rating=${movie.rating},metascore=${movie.metascore},
      votes=${movie.votes}, gross_earning_in_mil=${movie.gross},director='${movie.director}',
      actor='${movie.actor}',year=${movie.year} where rank=${id}`,
        (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
});

// DELETE : Deleting movie by movie id
const deleteMovie = (id) => new Promise((resolve, reject) => {
    con.query(`delete from moviesdata where rank=${id}`, (err, data) => {
        if (err) {
            return reject(err);
        }
        return resolve(data);
    });
});

module.exports = {
    getmoviesByID,
    getAllMovies,
    addNewMovie,
    updateMovie,
    deleteMovie,
};

