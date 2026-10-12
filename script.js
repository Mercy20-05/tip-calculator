// State
let billAmount = 0;
let tipPercent = 0;
let peopleCount = 1;

// DOM Elements
const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.tip-btn');
const customTipInput = document.getElementById('custom-tip-input');
const peopleInput = document.getElementById('people-input');
const peopleWrapper = document.getElementById('people-wrapper');
const errorMessage = document.getElementById('error-message');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetBtn = document.getElementById('reset-btn');

// Format money as currency string ($0.00)
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Calculate tip and total per person
function calculate() {
  // Guard against division by zero or negative people count
  if (peopleCount <= 0 || isNaN(peopleCount)) {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
    return;
  }

  if (billAmount > 0 && peopleCount > 0) {
    const totalTip = (billAmount * tipPercent) / 100;
    const tipPerPerson = totalTip / peopleCount;
    const totalPerPerson = (billAmount + totalTip) / peopleCount;

    tipAmountDisplay.textContent = formatCurrency(tipPerPerson);
    totalAmountDisplay.textContent = formatCurrency(totalPerPerson);
  } else {
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
  }

  updateResetButtonState();
}

// Check if reset button should be active or disabled
function updateResetButtonState() {
  const isDefault = billAmount === 0 && tipPercent === 0 && (peopleInput.value === '' || peopleInput.value === '1');
  resetBtn.disabled = isDefault;
}

// Input Handlers
billInput.addEventListener('input', (e) => {
  billAmount = parseFloat(e.target.value) || 0;
  calculate();
});

// Tip button click handlers
tipButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tipButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    customTipInput.value = '';

    tipPercent = parseFloat(btn.dataset.tip);
    calculate();
  });
});

// Custom tip input handler
customTipInput.addEventListener('input', (e) => {
  tipButtons.forEach((b) => b.classList.remove('active'));
  tipPercent = parseFloat(e.target.value) || 0;
  calculate();
});

// People input handler with zero-validation
peopleInput.addEventListener('input', (e) => {
  const value = e.target.value.trim();
  const parsedValue = parseInt(value, 10);

  if (value === '0' || parsedValue === 0) {
    errorMessage.classList.remove('hidden');
    peopleWrapper.classList.add('error-state');
    peopleCount = 0;
  } else {
    errorMessage.classList.add('hidden');
    peopleWrapper.classList.remove('error-state');
    peopleCount = parsedValue > 0 ? parsedValue : 1;
  }

  calculate();
});

// Reset functionality
resetBtn.addEventListener('click', () => {
  billAmount = 0;
  tipPercent = 0;
  peopleCount = 1;

  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';

  tipButtons.forEach((btn) => btn.classList.remove('active'));
  errorMessage.classList.add('hidden');
  peopleWrapper.classList.remove('error-state');

  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';
  resetBtn.disabled = true;
});