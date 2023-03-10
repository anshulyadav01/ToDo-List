// jshint esversion: 6

const bodyParser = require('body-parser');
const express = require('express');
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food","Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", (req, res) => {

    let day = date.getDate();

    res.render('list', 
    {
        listTitle: day,
        newListItems: items
    });

});



app.post("/", (req, res) => {


    const item = req.body.newItem;
    
    if(req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        console.log(item);
        res.redirect('/');
    }

});

app.get("/about", (req, res) => {
    res.render("about");
})

app.get("/work", (req, res) => {
    res.render('list', {
        listTitle: 'Work List',
        newListItems: workItems
    });
});

app.post('/work', (req, res) => {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});


app.listen(3000, (req, res) => {
    console.log("Server successfully started on port 3000");
})