var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    Fund = require("./models/fund"),
    seedDb = require("./seed"),
    bodyParser = require("body-parser"),
    methodOverride        = require("method-override"),
    port    = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost:27017/money_manager", {useNewUrlParser: true});

// seedDb();

//Routes
app.get("/", function(req, res){
    res.send("Index Page");
});

app.get("/splitter", function(req, res){
    res.render("splitter");
});

app.get("/funds", function(req, res){
    Fund.find({}, null, function(err, allFunds){
        if(err){
            console.log(err);
        } else {
            res.render("funds", {funds: allFunds});
        }
    });
});

app.post("/funds", function(req, res) {
    // Get data from form
    var newFund = {
        name: req.body.name,
        amount: Number(req.body.amount),
        goal: Number(req.body.goal)
    };

    //Create new fund and save to DB
    Fund.create(newFund, function(err, newFund){
        if(err) {
            console.log(err);
        } else {
            //redirect to fund page
            res.redirect("/funds");
        }
    });
});

//FUND DELETE
app.delete("/funds/:id", function(req, res){
    Fund.findByIdAndDelete(req.params.id, function(err){
        if(err) {
            res.redirect("/");
        } else {
            res.redirect("/funds");
        }
    });
});

//Listen
app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});