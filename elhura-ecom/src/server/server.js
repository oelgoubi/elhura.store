const express = require('express');
const bodyParser = require ('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/hello', (req, res) => {
    res.send("Hello World🌏");
});

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/api/hello `)
});