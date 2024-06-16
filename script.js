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
      validateThenCalculate();
    });

    rangeInput.addEventListener("input", function () {
      textInput.value = rangeInput.value;
      validateThenCalculate();
    });
  }

  //Form validation and calculation
  let carValueError = document.getElementById("carValueError");
  let leasePeriodError = document.getElementById("leasePeriodError");
  let downPaymentError = document.getElementById("downPaymentError");
  function validateThenCalculate() {
    let isValid = true;
    clearError();

    const carValue = parseFloat(carValueText.value);
    const downPayment = parseFloat(downPaymentText.value);
    const leasePeriod = parseInt(leasePeriodInput.value);

    if (carValue < 10000 || carValue > 200000) {
      carValueError.textContent = "Car value must be between $10,000 and $200,000";
      isValid = false;
    }

    if (leasePeriod < 12 || leasePeriod > 60) {
     
      leasePeriodError.textContent = "Lease period must be between 12 and 60 months";
      isValid = false;
    }

    if (downPayment < 10 || downPayment > 50) {
      
      downPaymentError.textContent = "Down payment must be between 10% and 50%";
      isValid = false;
    }

    if (isValid) {
      calculateLeasingDetails();
    }
  }
  

  function clearError() {
    carValueError.textContent = "";
    leasePeriodError.textContent = "";
    downPaymentError.textContent = "";
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

  carValueText.addEventListener("input", validateThenCalculate);
  downPaymentText.addEventListener("input", validateThenCalculate);
  leasePeriodInput.addEventListener("input", validateThenCalculate);
  carTypeSelect.addEventListener("change", validateThenCalculate);
});
