const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", calculate);

const leftovertext = document.getElementById("leftoveramount");

function calculate() {
    const total = document.getElementsByName("total")[0].value;
    const funds = document.getElementsByName("fund");
    if(total) {
        let percentages = [];
        let amounts = [];
        for(let fund of funds){
            let percentage = new Decimal(fund.value / 100);
            percentages.push(percentage);
            let amount = total * percentage;
            // alert(amount);
            amount = truncateToDecimals(amount);
            // alert(amount);
            amounts.push(amount);
        }
        if (checkIfHundredPercent(percentages)) {
            let leftover = checkIfEqualsTotal(amounts, total);
            leftovertext.innerText = leftover;
            displayAmounts(amounts);
        } else {
            alert("Your percentage split doesn't equal 100");
        }
    } else {
        alert("Please enter a total");
    }
}

function checkIfHundredPercent(arr) {
    let total = new Decimal(0);
	arr.forEach(percent => {
        total = Decimal.add(total, percent);
    });
    return total == 1;
}

function checkIfEqualsTotal(amounts, total) {
    let amountTotal = new Decimal(0);
    amounts.forEach(amount => {
        amountTotal = Decimal.add(amountTotal, amount);
    });
    let leftover = Decimal.sub(total, amountTotal);
    leftover = leftover.toFixed(2);
    return leftover;
}

function displayAmounts(amounts) {
    let funds = document.getElementsByClassName("amount");
    for(let i = 0; i < funds.length; i++) {
        funds[i].innerText = " $" + amounts[i];
        funds[i].style.display = "inline";
    }
}

function truncateToDecimals(num, dec = 2) {
    const calcDec = Math.pow(10, dec);
    return Math.trunc(num * calcDec) / calcDec;
}

//Deleting Funds
const deleteButtons = document.getElementsByClassName("icon");

for(let button of deleteButtons){
    button.addEventListener("click", deleteListing);
}

function deleteListing() {
    let listing = this.parentElement;
    listing.parentNode.removeChild(listing);
}

//Adding Funds
const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addListing);

const newFundInput = document.getElementsByName("newFund")[0];
const fundList = document.getElementById("fundList");

function addListing() {
    let newFundName = newFundInput.value;
    newFundInput.value = "";

    //Create Everything
    let li = document.createElement("li");
    let spanOne = document.createElement("span");
    spanOne.setAttribute("class", "icon");
    spanOne.addEventListener("click", deleteListing);
    let i = document.createElement("i");
    i.setAttribute("class", "fas fa-trash");
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", "fund");
    let spanTwo = document.createElement("span");
    spanTwo.setAttribute("class", "amount");

    //Append things to each other
    spanOne.appendChild(i);
    spanTwo.append("$0.00");

    li.append(spanOne, " ", newFundName, input, " | ", spanTwo);

    //Append to List
    fundList.append(li);
}