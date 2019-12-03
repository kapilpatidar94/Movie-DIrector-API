const Sequel = require('sequelize');
const express=require('express');
const app = express();

const db = require('./db.js');
const fs = require('fs');

app.listen(8080);

const readData = fs.readFileSync('./moviedata.json', 'utf8');
const movieData = JSON.parse(readData);

const distinctDirector = [];

// Creation and insertion in seqmovies table
const moviesTable = db.define(
    'seqmovies',
    {
        rank: {
            type: Sequel.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequel.STRING,
        description: Sequel.STRING,
        runtime: Sequel.INTEGER,
        genre: Sequel.STRING,
        rating: Sequel.FLOAT,
        metascore: Sequel.FLOAT,
        votes: Sequel.INTEGER,
        gross: Sequel.INTEGER,
        director: Sequel.STRING,
        actor: Sequel.STRING,
        year: Sequel.INTEGER

    }, {
    timestamps: false,
}
)

// db.sync().then(() => {
//     moviesTable.findAll().then((data) => {
//         console.log(data);
//     })
// })

// console.log(movieData);

// db.sync().then(function() {
//     moviesTable.bulkCreate(movieData)
//     .then(function(){})

// });

db.sync({ force: true }).then(() => {
    moviesTable.findAll();
}).then(() => {
    for (const obj of movieData) {
        if (!distinctDirector.includes(obj.Director)) {
            distinctDirector.push(obj.Director);
        }
        for (const key in obj) {
            if (obj[key] === 'NA') {
                obj[key] = null;
            }
        }
        moviesTable.create({
            rank: obj.Rank,
            title: obj.Title,
            description: obj.Description,
            runtime: obj.Runtime,
            genre: obj.Genre,
            rating: obj.Rating,
            metascore: obj.Metascore,
            votes: obj.Votes,
            gross: obj.Gross_Earning_in_Mil,
            director: obj.Director,
            actor: obj.Actor,
            year: obj.Year,
        });
    }
}).catch((err) => {
    console.log(err);
});

// seqdirectors table creation and insertion

const directorsTable = db.define('seqdirectors', {
    dname: Sequel.STRING,
},
{
    timestamps:false,
});
db.sync({ force: true }).then(() => {
    directorsTable.findAll();
}).then(() => {
    for (const obj of distinctDirector) {
        directorsTable.create({
            dname: obj,
        });
    }
})
    .catch((err) => {
        console.log(err);
    });

module.exports = {
    app,
    db
}