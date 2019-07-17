var mongoose = require("mongoose");
var Fund = require("./models/fund")

var data = [
    {
        name: "Savings",
        amount: 750,
        goal: 1000
    },
    {
        name: "Paris Trip",
        amount: 1250,
        goal: 1500
    },
    {
        name: "PS4",
        amount: 100,
        goal: 300
    }
];

function seedDB() {
    data.forEach(function(fund) {
        Fund.create(fund, function(err, newFund) {
            if(err) {
                console.log(err);
            } else {
                console.log("Fund Created: ");
                console.log(newFund);
            }
        });
    });
}

module.exports = seedDB;