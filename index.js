const express = require('express');
const fetch = require("node-fetch");
const path = require('path');
const dotenv = require("dotenv");
const {usersRoutes} = require("./routes");
const {Database, User} = require("./src/models")

dotenv.config();

const app = express();

const port = 3000;

const mongoURL =  process.env.MONGO_URL;

app.use("/public", express.static(path.join(__dirname, "dist", 'assets')));

app.get('', (req, res)=>{
    res.sendFile(path.join(__dirname, "dist", 'index.html'));
});

app.get("/news", (req, res) =>{
    res.end("news endpoint");
    const topic = req.query.q;
    const apiKey = 'a52e5ae581a64a90ac728505c40789a4';
    let url = `https://localhost:3000/news?q=${topic}&apiKey=${apiKey}`;
    fetch(url).then(response =>{
        return response.json();
    })
    .then(data =>{
        res.end(data);
    })
    .catch(e =>{
        res.status(400).end();
    })
})

app.use("/users", usersRoutes);

app.listen(port, ()=>{
    console.log(`app is running in port ${port}`);
});
