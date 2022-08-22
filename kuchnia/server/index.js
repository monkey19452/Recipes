const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cruddatabase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.get('/api/get', (req,res)=> {
    const sqlSelect = 
    "SELECT * FROM recipe"
    db.query(sqlSelect, (err,result)=> {
        res.send(result) 
    });
})

app.post("/api/insert", (req,res)=> {
    const recipe_name = req.body.recipe_name
    const recipe_ingr = req.body.recipe_ingr
    const recipe_step = req.body.recipe_step
    const sqlInsert = 
    "INSERT INTO recipe (recipe_name, recipe_ingr, recipe_step) VALUES (?,?,?) "
    db.query(sqlInsert, [recipe_name,recipe_ingr,recipe_step],(err,result)=> {
        console.log(result)
    });
});

app.delete('/api/delete/:recipe_name', (req,res) => {
    const name = req.params.recipe_name
    const sqlDelete = 
    "DELETE FROM recipe WHERE recipe_name = ?";
    db.query(sqlDelete, name, (err,result) => {
        if (err) console.log(err)
    })
})

app.listen(3001,() => {
    console.log('Działa na porcie 3001');
});
