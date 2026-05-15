let selectedSource = "grid";

const emissionFactors = {
  grid: 0.82,
  solar: 0.017,
  wind: 0.023
};

const costPerKwh = {
  grid: 8,
  solar: 3,
  wind: 4.25
};
const tabs = document.querySelectorAll(".nav-tab");

tabs.forEach(tab => {

  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));

    tab.classList.add("active");

    const target = tab.dataset.tab;

    document
      .querySelectorAll(".tab-panel")
      .forEach(panel => panel.classList.remove("active"));

    document
      .getElementById(`tab-${target}`)
      .classList.add("active");

  });

});


const sourceButtons = document.querySelectorAll(".source-btn");

sourceButtons.forEach(button => {

  button.addEventListener("click", () => {

    sourceButtons.forEach(btn =>
      btn.classList.remove("selected")
    );

    button.classList.add("selected");

    selectedSource = button.dataset.source;

  });

});


document
  .getElementById("calculateBtn")
  .addEventListener("click", calculateEV);


async function calculateEV() {

  const battery =
    parseFloat(document.getElementById("battery").value);

  const currentSoc =
    parseFloat(document.getElementById("currentSoc").value);

  const targetSoc =
    parseFloat(document.getElementById("targetSoc").value);

  const location =
    document.getElementById("location").value;


  if (targetSoc <= currentSoc) {

    alert("Target SOC must be greater than current SOC");

    return;
  }


  const energy =
    battery * ((targetSoc - currentSoc) / 100);

  const cost =
    energy * costPerKwh[selectedSource];

  const emission =
    energy * emissionFactors[selectedSource];

  const petrolEquivalent = 19.2;

  const saving =
    Math.round(
      ((petrolEquivalent - emission) / petrolEquivalent) * 100
    );


  document.getElementById("energyResult").innerText =
    `${energy.toFixed(1)} kWh`;

  document.getElementById("costResult").innerText =
    `₹${Math.round(cost)}`;

  document.getElementById("emissionResult").innerText =
    `${emission.toFixed(2)} kg`;

  document.getElementById("savingResult").innerText =
    `${saving}%`;


  // FUTURE DATABASE STORAGE
  // Backend API integration will go here

  console.log({
    battery,
    currentSoc,
    targetSoc,
    selectedSource,
    location,
    energy,
    cost,
    emission
  });

}