const   mongoose = require('mongoose'),
        express = require('express'),
        bodyParser = require('body-parser'),
        path = require('path'),
        cors = require('cors'),
        session = require('express-session'),
        cookieParser= require('cookie-parser'),
        flash = require('connect-flash');


        // Define Global Variables
const app = express();

        // set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: "Secret is Not Always a Secret", 
  cookie: { maxAge: 60000 },
  resave: false,    // forces the session to be saved back to the store
  saveUninitialized: false  // dont save unmodified
}));
app.use(flash());
// importing files
const routes = require('./routes/api');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const log = console.log;
const PORT = process.env.PORT || 8080; // Step 1

mongoose.connect("mongodb://localhost:27017/empDB",{ useNewUrlParser: true , useUnifiedTopology: true });

app.use(cors());

app.use('/api',routes);




/*
// Step 2
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/my_database', {
    useNewUrlParser: true
});

// Configuration



// Step 3
if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}
 */
app.listen(PORT, () => {
    log(`Server is starting at PORT: ${PORT}`);
});
