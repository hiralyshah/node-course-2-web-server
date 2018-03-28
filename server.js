const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();
app.engine('pug', require('pug').__express)

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
})

//app.use((req,res,next)=>{
   // res.render('maintenance.pug');
//})

app.use('user/:id', (req,res,next)=>{
    console.log('Request Type: ', req.method);
    next();
})

app.get('/', (req,res)=>{
    res.render('homepage',{
        sitename: 'loyalT',
        name: 'hiral',
        currentYear: new Date().getFullYear(),
       
    })
})

app.get("/index", (req, res) => {
    res.render('index',{
        name: 'Hiral',
        currentYear: new Date().getFullYear(),
        pageTitle: 'Index page',
        vegetables: [
            "carrot",
            "potato",
            "beet"
        ],
        
    })
    });

    app.get('/about', (req,res) =>{
        res.render('about',{
            name: 'Welcome to LoyalT'
        })
    })
/*const express = require('express');
const pug = require('pug');
const path = require('path');

//init app
const app = express()

//load view engine
//app.use(express.static(__dirname + 'views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Compile template.pug, and render a set of data
console.log(pug.render('homepage.pug', {
    name: 'Timothy'
  }));
  
//home route
app.get('/', (req, res) => {
    //res.send('<h1>Hello World!</h1>');
    res.send({
        name: 'hiral',
        likes: ['new','career','start']
    })
});

app.get('/', (req,res)=>{
    res.render('about.pug', {
        user:res.user
    });
});

app.get('/', (req, res) => {
    res.render("homepage");
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
})*/

app.listen(3000, () => console.log('Example app listening on port 3000!'))