const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", calculate);

const leftovertext = document.getElementById("leftoveramount");

function calculate() {
    const total = document.getElementsByName("total")[0].value;
    const funds = document.getElementsByClassName("fund");
    if(total) {
        let percentages = [];
        let amounts = [];
        for(let fund of funds){
            let percentage = new Decimal(fund.value / 100);
            percentages.push(percentage);
            let amount = total * percentage;
            amount = amount.toFixed(2, Decimal.ROUND_DOWN);
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
    let leftover = total - amountTotal
    leftover = leftover.toFixed(2);
    return leftover;
}

function displayAmounts(amounts) {
    let funds = document.getElementsByClassName("fundAmount");
    for(let i = 0; i < funds.length; i++) {
        funds[i].innerText = " - $" + amounts[i];
        funds[i].style.display = "inline";
    }
}