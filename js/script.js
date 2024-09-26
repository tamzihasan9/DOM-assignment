// Get elements from the DOM
const donationSection = document.getElementById('donation-section');
const historySection = document.getElementById('history-section');
const donateButtons = document.querySelectorAll('.donate-btn');
const amountInputs = document.querySelectorAll('.donation-card input[type="number"]');
const bdtAmountElement = document.getElementById('bdt-amount');
const historyList = document.getElementById('history-list');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const currentDonationAmountElement =document.getElementById('current-donation-amount');
// Global variables
let accountBalance = 5500;  
let transactionHistory = [];

 
function updateAccountBalance(amount) {
  accountBalance -= amount;
  bdtAmountElement.textContent = `${accountBalance} BDT`;
}
 
function toggleActive(button) {
    const activeButton = document.querySelector('.tab-btn.active');
    if (activeButton !== button) {
        activeButton.classList.remove('active');
        button.classList.add('active');
    }
}


 


 
function addToHistory(date, amount, donationName) {
  const li = document.createElement('li');
  li.textContent = `${date} - ${amount} BDT - ${donationName}`;
  historyList.appendChild(li);
  transactionHistory.push({ date, amount, donationName });
}

 
function showSection(sectionToShow, sectionToHide) {
  sectionToShow.style.display = 'block';
  sectionToHide.style.display = 'none';
}

 
function validateDonationAmount(amount) {
  if (amount > accountBalance) {
    alert('Donation amount cannot be greater than your account balance.');
    return false;
  }

  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid donation amount.');
    return false;
  }

  return true;
}
// ... rest of your JavaScript code

// // Function to update the current donation amount
// function updateCurrentDonationAmount(amount) {
//     const currentDonationAmountElement = document.getElementById('current-donation-amount');
//     currentDonationAmountElement.textContent = `$${amount}`;
// }

// // Function to handle the "Donate Now" button click
// function handleDonateClick(index) {
//     // ... rest of your donation handling logic

//     // Update the current donation amount
//     const donationAmount = parseInt(amountInputs[index].value);
//     updateCurrentDonationAmount(donationAmount);
// }

// ... rest of your JavaScript code
 
function handleDonateClick(index) {
  const amountInput = amountInputs[index];
  const donationAmount = parseInt(amountInput.value);
  const donationName = donationSection.children[index].querySelector('.donation-title').textContent;

  if (validateDonationAmount(donationAmount)) {
    const currentDate = new Date();
    updateAccountBalance(donationAmount);
    addToHistory(currentDate.toLocaleString(), donationAmount, donationName);
    showSuccessMessage(`Successfully donated ${donationAmount} BDT to ${donationName}`);
    amountInput.value = '';
  }
}

 
function showSuccessMessage(message) {
  modalMessage.textContent = message;
  modal.style.display = 'block';
}
function navigateToBlog() {
    window.location.href = "blog.html";  
}

 
function closeModal() {
  modal.style.display = 'none';
}

 
document.querySelector('.tab-btn.active').addEventListener('click', () => {
  showSection(donationSection, historySection);
});
document.querySelector('.tab-btn:not(.active)').addEventListener('click', () => {
  showSection(historySection, donationSection);
});

 
donateButtons.forEach((button, index) => {
  button.addEventListener('click', () => handleDonateClick(index));
});

 
showSection(donationSection, historySection);