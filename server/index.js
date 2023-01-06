const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
//middleware
app.use(cors());
app.use(express.json());


app.post("/signup", async (req, res) =>{
    try{
        const {firstname, lastname, username, email, password} = req.body
        const signUp = await pool.query("INSERT INTO user_info (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *", [firstname, lastname, username, email, password])
        res.send(signUp.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body
        const logIn = await pool.query("SELECT * FROM user_info WHERE username=($1) AND password=($2)", [username, password])
        res.send(logIn.rows)
    } catch (error) {
        console.error(error.message);
        res.send("error")
    }
})

app.listen(5000, () =>{
    console.log("server is running on port 5000")
})