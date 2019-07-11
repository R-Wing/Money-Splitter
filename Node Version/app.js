var express = require("express"),
    app     = express(),
    port    = 3000;

app.set("view engine", "ejs");

//Routes
app.get("/", function(req, res){
    res.send("Up and running!");
});

//Listen
app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});