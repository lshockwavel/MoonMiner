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

function updateCheeseTooltip() {
  const moonImage = document.getElementById('moon-image');
  moonImage.setAttribute('title', `Cheese: ${cheese}`);
}

function updateStats() {
  const statsElem = document.getElementById('click-stats');
  statsElem.innerHTML = ''; // Clear previous stats

  clickUpgrades.forEach(upgrade => {
    const statElem = document.createElement('p');
    statElem.innerText = `${upgrade.name}: ${upgrade.quantity} (Bonus: ${upgrade.bonus})`;
    statsElem.appendChild(statElem);
  });
  
  const autosElem = document.getElementById('auto-stats');
  autosElem.innerHTML = ''; // Clear previous stats

  automaticUpgrades.forEach(upgrade => {
    const autoElem = document.createElement('p');
    autoElem.innerText = `${upgrade.name}: ${upgrade.quantity} (Bonus: ${upgrade.bonus})`;
    autosElem.appendChild(autoElem);
  });
}

function updateClickCounter() {
  const clickCounterElem = document.getElementById('ClickCounter');
  let clickScore = 0;
  clickUpgrades.forEach(upgrade => {
    clickScore += upgrade.quantity * upgrade.bonus;
  });

  const upgradeButtons = clickCounterElem.querySelector('.counter')
  upgradeButtons.innerText = `Click Score: ${clickScore}`;

  const automationCounterElem = document.getElementById('automation-counter');
  let automationScore = 0;
  for (let i = 0; i < automaticUpgrades.length; i++) {
    automationScore += automaticUpgrades[i].quantity * automaticUpgrades[i].bonus; // Calculate total cheese from automatic upgrades
  }
  automationCounterElem.innerText = `+${automationScore}`; // Update automation score display

}

function updateUpgradeButtons() {
  const clickUpgradeButtons = document.querySelectorAll('.click-upgrade-button');
  clickUpgradeButtons.forEach((button, index) => {
    button.innerText = `${clickUpgrades[index].name} (${clickUpgrades[index].price})`;
    button.disabled = cheese < clickUpgrades[index].price;
  });

  const autoUpgradeButtons = document.querySelectorAll('.auto-upgrade-button');
  autoUpgradeButtons.forEach((button, index) => {
    button.innerText = `${automaticUpgrades[index].name} (${automaticUpgrades[index].price})`;
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
  } else {
    alert('Not enough cheese!');
  }
}

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
  } else {
    alert('Not enough cheese!');
  }
}

function collectAutoUpgrades() {
  for (let i = 0; i < automaticUpgrades.length; i++) {
    cheese += automaticUpgrades[i].quantity * automaticUpgrades[i].bonus;
  }
  updateCounter();
  updateUpgradeButtons();
}

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