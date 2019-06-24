const totalInput = document.getElementsByName("total")[0];
const savingsInput = document.getElementsByName("savings")[0];
const spendingInput = document.getElementsByName("spending")[0];
const calculateBtn = document.getElementById("calculate");
const savings = document.getElementById("savings");
const spending = document.getElementById("spending");

calculateBtn.addEventListener("click", calculate);

function calculate() {
	let savingsPercentage = calculatePercentage(savingsInput.value);
  let spendingPercentage = calculatePercentage(spendingInput.value);
  let splits = [savingsPercentage, spendingPercentage];
  if(totalInput.value) {
  	if (checkIfHundred(splits)) {
      savings.innerText = " - $" + totalInput.value * savingsPercentage;
      spending.innerText = " - $" + totalInput.value * spendingPercentage;
      savings.style.display = "inline";
      spending.style.display = "inline";
    } else {
      alert("not enough");
    }
  } else {
  	alert("Please enter a total");
  }
}

function calculatePercentage(value) {
	return value / 100;
}

function checkIfHundred(arr) {
	let total = 0;
	for(let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total == 1;
}