document.addEventListener("DOMContentLoaded", function () {
  const carTypeSelect = document.getElementById("carType");
  const carValueText = document.getElementById("carValueText");
  const carValueRange = document.getElementById("carValueRange");
  const leasePeriodInput = document.getElementById("leasePeriodInput");
  const downPaymentText = document.getElementById("downPaymentText");
  const downPaymentRange = document.getElementById("downPaymentRange");

  //Sync between input and range input
  syncInputs(carValueText, carValueRange);
  syncInputs(downPaymentText, downPaymentRange);

  function syncInputs(textInput, rangeInput) {
    textInput.addEventListener("input", function () {
      rangeInput.value = textInput.value;
      calculateLeasingDetails();
    });

    rangeInput.addEventListener("input", function () {
      textInput.value = rangeInput.value;
      calculateLeasingDetails();
    });
  }

  function calculateLeasingDetails() {
    const carType = document.getElementById("carType").value;
    const carValue = parseFloat(carValueText.value);
    const leasePeriodMonths = parseInt(leasePeriodInput.value);
    const downPaymentPercentage = parseFloat(downPaymentText.value);
    const resultsContainer = document.getElementById("results");

    const downPayment = carValue * (downPaymentPercentage / 100);
    const interestRate = carType === "BrandNew" ? 2.99 : 3.7;

    const loanAmount = carValue - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    //Calculation of compound interest
    const monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, leasePeriodMonths)) / (Math.pow(1 + monthlyInterestRate, leasePeriodMonths) - 1);
    const totalAmount = monthlyPayment * leasePeriodMonths + downPayment;

    //Step by step vizualization of the data
    document.getElementById("totalCost").textContent = `${totalAmount ? `$${totalAmount.toFixed(2)}` : ""}`;
    document.getElementById("downPayment").textContent = `${downPayment ? `$${downPayment.toFixed(2)}` : ""}`;
    document.getElementById("monthlyPayment").textContent = `${monthlyPayment ? `$${monthlyPayment.toFixed(2)}` : ""}`;
    document.getElementById("interestRate").textContent = `${interestRate ? `$${interestRate.toFixed(2)}` : ""}`;

    resultsContainer.style.display = "block";
  }

  carValueText.addEventListener("input", calculateLeasingDetails);
  downPaymentText.addEventListener("input", calculateLeasingDetails);
  leasePeriodInput.addEventListener("input", calculateLeasingDetails);
  carTypeSelect.addEventListener("change", calculateLeasingDetails);
});
