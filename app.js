let cheese = 0;

let clickUpgrades = [
  {
    name: 'knife',
    price: 100,
    quantity: 1,
    bonus: 1
  },
  {
    name: 'drill',
    price: 250,
    quantity: 0,
    bonus: 5
  },
];

let automaticUpgrades = [
  {
    name: 'mousetronaut',
    price: 1000,
    quantity: 0,
    bonus: 10
  },
  {
    name: 'space-station',
    price: 50000,
    quantity: 0,
    bonus: 100
  }
];

function mine() {
  let bonus = 0;
  for (let i = 0; i < clickUpgrades.length; i++) {
    bonus += clickUpgrades[i].quantity * clickUpgrades[i].bonus;
  }
  cheese += bonus;

  updateUpgradeButtons();
  updateCounter();
}

function updateCounter() {
  // const cheeseCountElem = document.getElementById('CheeseCount');
  // cheeseCountElem.innerText = cheese;

  // const clickCounterElem = document.getElementById('ClickCounter');
  // clickCounterElem.innerText = `Click Score: ${cheese}`; // Update click score display

  const cheeseCountElem = document.getElementById('CheeseCount');
  cheeseCountElem.innerText = `Cheese: ${cheese}`; // Update cheese display

  // const cheeseBarElem = document.getElementById('CheeseBar');
  // cheeseBarElem.style.width = `${cheese / 1000 * 100}%`; // Update cheese bar width

  
  updateCheeseTooltip(); // Update the tooltip
}

// Function to update the tooltip for the cheese amount when hovering over the moon image
function updateCheeseTooltip() {
  const moonImage = document.getElementById('moon-image');

  // Update the tooltip with the current cheese amount if above 0
  if (cheese > 0) {
    moonImage.setAttribute('title', `Cheese: ${cheese}`);
  }
}


// Function to update the stats for click and automatic upgrades
function updateStats() {

  //Updates the stats for the Click Upgrades
  const statsElem = document.getElementById('click-stats');
  statsElem.innerHTML = ''; // Clear previous stats

  clickUpgrades.forEach(upgrade => {
    const statElem = document.createElement('p');
    statElem.innerHTML = `${upgrade.name} Qty: <span class="number-box">${upgrade.quantity}</span> 
        => Total Cheese: <span class="number-box">${upgrade.bonus * upgrade.quantity}</span>`;
    statsElem.appendChild(statElem);
    });

  //Updates the stats for the Automatic Upgrades
  const autosElem = document.getElementById('auto-stats');
  autosElem.innerHTML = ''; // Clear previous stats

  automaticUpgrades.forEach(upgrade => {
    const autoElem = document.createElement('p');
    autoElem.innerHTML = `${upgrade.name} Qty: <span class="number-box">${upgrade.quantity}</span> 
    => Total Cheese: <span class="number-box">${upgrade.bonus * upgrade.quantity}</span>`;
    autosElem.appendChild(autoElem);
  });
}

// Function to update the click counter and automation score
function updateClickCounter() {

  // Update the click score based on the upgrades purchased "Total per Click"
  const clickCounterElem = document.getElementById('ClickCounter');
  let clickScore = 0;
  clickUpgrades.forEach(upgrade => {
    clickScore += upgrade.quantity * upgrade.bonus;
  });

  const upgradeButtons = clickCounterElem.querySelector('.counter')
  upgradeButtons.innerText = `Click Score: ${clickScore}`;

  // Update the automation score based on the automatic upgrades purchased "total timer"
  const automationCounterElem = document.getElementById('automation-counter');
  let automationScore = 0;
  for (let i = 0; i < automaticUpgrades.length; i++) {
    automationScore += automaticUpgrades[i].quantity * automaticUpgrades[i].bonus; // Calculate total cheese from automatic upgrades
  }
  automationCounterElem.innerText = `+${automationScore}`; // Update automation score display
}

// Function to update the upgrade buttons based on cheese amount
function updateUpgradeButtons() {

  // Update the click upgrade buttons based on cheese amount as well as disable buttons if not enough cheese
  const clickUpgradeButtons = document.querySelectorAll('.click-upgrade-button');
  clickUpgradeButtons.forEach((button, index) => {
    button.innerHTML = `${clickUpgrades[index].name} <span class="mdi mdi-cheese"></span>${clickUpgrades[index].price}`;
    button.disabled = cheese < clickUpgrades[index].price;
  });

  // Update the automatic upgrade buttons based on cheese amount as well as disable buttons if not enough cheese
  const autoUpgradeButtons = document.querySelectorAll('.auto-upgrade-button');
  autoUpgradeButtons.forEach((button, index) => {
  button.innerHTML = `${automaticUpgrades[index].name} <span class="mdi mdi-cheese"></span>${automaticUpgrades[index].price}`;
  button.disabled = cheese < automaticUpgrades[index].price;
});
}

// function buyKnifeUpgrade() {
//   if (cheese >= clickUpgrades[0].price) {
//     cheese -= clickUpgrades[0].price;
//     clickUpgrades[0].quantity++;
//     clickUpgrades[0].price = Math.round(clickUpgrades[0].price * 1.2);
//     updateClickCounter();
//     updateCounter();
//     updateUpgradeButtons();
//     updateStats();
//   }
//   else {
//     alert('Not enough cheese!');
//   }
// }

// function to buy click upgrades depending on the name of the upgrade. 
function buyClickUpgrade(name) {
  const upgrade = clickUpgrades.find(upgrade => upgrade.name === name);
  if (cheese >= upgrade.price) {
    cheese -= upgrade.price;
    upgrade.quantity++;
    upgrade.price = Math.round(upgrade.price * 1.3);
    updateClickCounter();
    updateCounter();
    updateUpgradeButtons();
    updateStats();
  }

  // Gives a warning if not enough cheese. Since button disabled is already in place with
  // function updateUpgradeButtons, this is just a backup.
  else {
    alert('Not enough cheese!');
  }
}

// function to buy automatic upgrades depending on the name of the upgrade. 
function buyAutoUpgrade(name) {
  const upgrade = automaticUpgrades.find(upgrade => upgrade.name === name);
  if (cheese >= upgrade.price) {
    cheese -= upgrade.price;
    upgrade.quantity++;
    upgrade.price = Math.round(upgrade.price * 1.25);
    updateClickCounter();
    updateCounter();
    updateUpgradeButtons();
    updateStats();
  }

  // Gives a warning if not enough cheese. Since button disabled is already in place with
  // function updateUpgradeButtons, this is just a backup.
  else {
    alert('Not enough cheese!');
  }
}

// Function to collect cheese from automatic upgrades every 3 seconds
function collectAutoUpgrades() {
  for (let i = 0; i < automaticUpgrades.length; i++) {
    cheese += automaticUpgrades[i].quantity * automaticUpgrades[i].bonus;
  }
  updateCounter();
  updateUpgradeButtons();
}


// Function to start the timer loop for the number of seconds
function startTimer() {
  const timerCountElem = document.querySelector('.timer-count');
  let timer = 3; // Start at 3 seconds

  setInterval(() => {
    timerCountElem.innerText = `${timer}`; // Update the timer display
    timer--;

    if (timer < 0) {
      timer = 3; // Reset the timer to 3 seconds
    }
  }, 1000); // Update every second
}

// Start the timer loop
startTimer();

//This function shrinks the timer bar every 3 seconds. It is not currently in use.
// function shrinkBar() {
//   const timerBar = document.querySelector('#timer-bar .progress-bar');
//   const duration = 3000; // 3 seconds
//   const intervalTime = 50; // Update every 50ms
//   let elapsedTime = 0;

//   const interval = setInterval(() => {
//     elapsedTime += intervalTime;
//     const width = 100 - (elapsedTime / duration) * 100; // Calculate remaining width
//     timerBar.style.width = `${width}%`;

//     if (elapsedTime >= duration) {
//       clearInterval(interval); // Stop when the timer reaches 3 seconds
//       timerBar.style.width = '100%'; // Reset the bar for the next cycle
//     }
//   }, intervalTime);
// }

// // Call shrinkBar every 3 seconds
// setInterval(() => {
//   shrinkBar();
// }, 3000);

setInterval(collectAutoUpgrades, 3000);

updateStats();
updateUpgradeButtons();