const express = require('express');
const  { handler } = require('./controllers/index');
const port = process.env.PORT || 4040;

const app = express();

app.use(express.json());


app.post("/", async (req, res) => {
    res.send( await handler(req));
    console.log("Received request:", req.body);
})

app.get("/", async (req, res) => {
    console.log("Received GET request");
})

app.listen(port, function(error) {
    if (error) console.log("Error starting server:", error);

    console.log(`Server is running on port ${port}`);
})