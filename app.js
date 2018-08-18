/* Nodemon continuously watches server */

const express = require('express'),
    exphbs = require('express-handlebars');

/* Initializes application */
const app = express();

/* Handlebars Middleware */
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

/* How middleware works */
app.use(function(req, res, next) {
 //   console.log(Date.now());

    /* req.name globally becomes this */
    req.name = 'Brad Traversy';
    next();
});

/* Index Route */
/* Get request goes to webpage and pulls content */
/*
    app.get();
    app.post();
    app.put();
    app.delete();
*/
/* Whenever you create a route, you must have req and res */
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

/* About Route */
/* res.send() sends data to the page
    res.render() pulls from a file and loads it */
app.get('/about', (req, res) => {
    res.render('about');
});

const port = 5000;

app.listen(port,  _ => {
    console.log(`Server started on port ${port}`);
});