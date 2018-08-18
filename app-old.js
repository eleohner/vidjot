// whenever you install a module and you want to bring itoff, just use require
const express = require('express');

// initialize application
const app = express();

// Index Route
// handling a get request
// going to webpage and getting content
// request and response (req and res)
app.get('/', (req, res) => {
    res.send('INDEX');
});

const port = 3000;

// listen, pass in port
// arrow function
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});