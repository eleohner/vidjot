/* Nodemon continuously watches server */

const express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

/* Initializes application */
const app = express();

/* Connect to Mongoose */
mongoose.connect('mongodb://localhost/vidjot-dev')
.then( _ => {
    console.log("MongoDB Connected");
})
.catch(err => console.log(err));

// Load Idea Model
require('./models/Ideas');
const Idea = mongoose.model('ideas');

/* Handlebars Middleware */
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

// Add Index Page
app.get('/ideas', (req, res) => {
    Idea.find({})
        .sort({date:'descending'})
        .then(ideas => {
            res.render('ideas/index', {
                ideas: ideas
            });
        });
    
}); 

// Add idea form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

// Process form
app.post('/ideas', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({text: 'Please add a title'});
    }

    if (!req.body.details) {
        errors.push({text: 'Please add some details'});
    }

    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    } else  {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            });
    }
});


const port = 5000;

app.listen(port,  _ => {
    console.log(`Server started on port ${port}`);
});