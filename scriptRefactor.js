const calculateBtn = document.getElementById("calculate");
calculateBtn.addEventListener("click", calculate);

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
            amounts.push(amount);
        }
        if (checkIfHundredPercent(percentages)) {
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

function displayAmounts(amounts) {
    let funds = document.getElementsByClassName("fundAmount");
    for(let i = 0; i < funds.length; i++) {
        funds[i].innerText = " - $" + amounts[i];
        funds[i].style.display = "inline";
    }
}