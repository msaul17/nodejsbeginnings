var express = require("express");
var app= express();
var bodyParser = require('body-parser');
var _ = require("underscore");


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());


var users = [
    {
        id: 1,
        username: "Jake",
        firstname: "Jake",
        lastname: "Donovan",
        age: 34

    },
    {
        id: 2,
        username: "Tom",
        firstname: "Tommy",
        lastname: "Jones",
        age: 34
    },
    {
        id: 3,
        username: "bill",
        firstname: "Bill",
        lastname: "Jackson",
        age: 34
    }

];

app.get('/usernames', function (req, res) {
 res.json(users)
});

app.post('/usernames', function(req, res){
    var newUser = req.body;
        users.push(newUser);
        res.json(users);
});
app.put('/usernames/:id', function(req, res) {

 // set the value of the id
 var targetId = parseInt(req.params.id);

 // find item in `Users` array matching the id
 var foundUser = _.findWhere(users, {id: targetId});

 // if form gave us a new firstname, update the User's firstname
 foundUser.firstname = req.body.firstname || foundUser.firstname;

 // if form gave us a new age, update that
 foundUser.age = req.body.age || foundUser.age;

 // send back edited object
 res.json(foundUser);
});

app.delete('/usernames/:id', function(req, res) {

 // set the value of the id
 var targetId = parseInt(req.params.id);

 // find item in `users` array matching the id
 var foundUser = _.findWhere(users, {id: targetId});

 // get the index of the found item
 var index = users.indexOf(foundUser);

 // remove the item at that index, only remove 1 item
 users.splice(index, 1);

 // send back deleted object
 res.json(foundUser);
});

app.listen(3000);