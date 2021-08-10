"use strict";
let overallIteration = -3;
let divWidth;
let black = "#121516";
let solution_colors = ["#9fb2b7", "#b3c3c8"];
let colloid_color = "#646869";
let suspension_color = "#878d86";

const apparatusOptions = [
  "option-light",
  "option-solution",
  "option-colloid",
  "option-suspension",
];

apparatusOptions.forEach(function (option) {
  document.getElementById(option).style.pointerEvents = "none";
});

document.getElementById("option-light").style.pointerEvents = "auto";

let light_comps = [
  "light-after-solution",
  "light-in-colloid",
  "light-after-colloid",
  "light-in-suspension",
  "light-after-suspension",
];

let torch_comps = ["torch-mouth", "light-after-torch"];

function removeLight() {
  let i;

  for (i = 0; i < light_comps.length; i++) {
    document.getElementById(light_comps[i]).setAttribute("offset", "0%");
  }

  for (i = 0; i < torch_comps.length; i++) {
    document.getElementById(torch_comps[i]).setAttribute("offset", "0%");
  }
}

function removeApparatus() {
  const ids = [
    "solution-beaker",
    "solution-top",
    "solution-bottom",
    "colloid-beaker",
    "colloid-top",
    "colloid-bottom",
    "suspension-beaker",
    "suspension-top",
    "suspension-bottom",
  ];

  let i;

  for (i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).style.fill = "none";
  }

  document.getElementById("colloid-light-stopcolor").style.stopColor =
    "#ffffff";
  document.getElementById("suspension-light-stopcolor").style.stopColor =
    "#ffffff";
}

function removeLabels() {
  const labels = [
    "s-solution",
    "o1-solution",
    "l-solution",
    "u-solution",
    "t-solution",
    "i-solution",
    "dot-solution",
    "o2-solution",
    "n-solution",
    "c-colloid",
    "o1-colloid",
    "l1-colloid",
    "l2-colloid",
    "o2-colloid",
    "i-colloid",
    "dot-colloid",
    "d-colloid",
    "s1-suspension",
    "u-suspension",
    "s2-suspension",
    "p-suspension",
    "e-suspension",
    "n1-suspension",
    "s3-suspension",
    "i-suspension",
    "dot-suspension",
    "o-suspension",
    "n2-suspension",
  ];

  let i;

  for (i = 0; i < labels.length; i++) {
    document.getElementById(labels[i]).style.fill = "none";
  }
}

function displayLabels(labels) {
  let i;

  for (i = 0; i < labels.length; i++) {
    document.getElementById(labels[i]).style.fill = black;
  }
}

function displaySolution() {
  const labels = [
    "s-solution",
    "o1-solution",
    "l-solution",
    "u-solution",
    "t-solution",
    "i-solution",
    "dot-solution",
    "o2-solution",
    "n-solution",
  ];

  displayLabels(labels);

  document.getElementById("solution-beaker").style.fill = black;
  document.getElementById("solution-top").style.fill = solution_colors[0];
  document.getElementById("solution-bottom").style.fill = solution_colors[1];
}

function displayColloid() {
  const labels = [
    "c-colloid",
    "o1-colloid",
    "l1-colloid",
    "l2-colloid",
    "o2-colloid",
    "i-colloid",
    "dot-colloid",
    "d-colloid",
  ];

  displayLabels(labels);

  document.getElementById("colloid-beaker").style.fill = black;
  document.getElementById("colloid-top").style.fill = colloid_color;
  document.getElementById("colloid-bottom").style.fill = colloid_color;
  document.getElementById("colloid-light-stopcolor").style.stopColor =
    colloid_color;
}

function displaySuspension() {
  const labels = [
    "s1-suspension",
    "u-suspension",
    "s2-suspension",
    "p-suspension",
    "e-suspension",
    "n1-suspension",
    "s3-suspension",
    "i-suspension",
    "dot-suspension",
    "o-suspension",
    "n2-suspension",
  ];

  displayLabels(labels);

  document.getElementById("suspension-beaker").style.fill = black;
  document.getElementById("suspension-top").style.fill = suspension_color;
  document.getElementById("suspension-bottom").style.fill = suspension_color;
  document.getElementById("suspension-light-stopcolor").style.stopColor =
    suspension_color;

  document.getElementById("light-torch").style.cursor = "pointer";
}

let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

async function shineLight() {
  if (overallIteration === 1) {
    for (let i = 0; i < 2; i++) {
      let finalPosition = 1;
      let curPosition = 0;
      while (true) {
        if (curPosition > finalPosition) break;
        curPosition += 0.01;
        document
          .getElementById(torch_comps[i])
          .setAttribute("offset", curPosition);
        await sleep(0.5);
      }
    }

    lightAnimation();
    overallIteration++;
    observeMessage();

    if (!restartAnimation) {
      setTimeout(function () {
        //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
        document.getElementById("instruction").innerHTML =
          "Click on Restart option in the Control Menu to restart the experiment from scratch.";
        //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
        document.getElementById("observation").innerHTML =
          "Click on Restart option in the Control Menu to restart the experiment from scratch.";
      }, 40000);
    }
  }
}

async function lightAnimation() {
  for (let i = 0; i < light_comps.length; i++) {
    let id = light_comps[i];
    let path = document.getElementById(id);
    let finalPosition = 1;
    let curPosition = 0;
    while (true) {
      if (curPosition > finalPosition) break;
      curPosition += 0.01;
      path.setAttribute("offset", curPosition);
      await sleep(0.5);
    }
  }
}

let setupMessages = [
  "Click on the Light Source option in the Apparatus Menu to introduce a light source such as a Torch into the workspace.",
  "Click on the Solution option in the Apparatus Menu to introduce a solution (ex: Water) into the workspace.",
  "Click on the Colloid option in the Apparatus Menu to introduce a colloidal solution (ex: Brewed Coffee) into the workspace.",
  "Click on the Suspension option in the Apparatus Menu to introduce a suspension (ex: Muddy Water) into the workspace.",
];

let setup = 0;

function setupMessage() {
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = setupMessages[setup];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = setupMessages[setup];
  setup++;
}

function apparatusSetup(oldOption, newOption) {
  document.getElementById(oldOption).style.pointerEvents = "none";
  document.getElementById(newOption).style.pointerEvents = "auto";
}

setupMessage();
async function visibility(x) {
  if (x === 1 && overallIteration === -3) {
    document.getElementById("torch-row").style.visibility = "visible";
    apparatusSetup("option-light", "option-solution");
    overallIteration++;
    setupMessage();
  } else if (x === 2 && overallIteration === -2) {
    displaySolution();
    apparatusSetup("option-solution", "option-colloid");
    overallIteration++;
    setupMessage();
  } else if (x === 3 && overallIteration === -1) {
    displayColloid();
    apparatusSetup("option-colloid", "option-suspension");
    overallIteration++;
    setupMessage();
  } else if (x === 4 && overallIteration === 0) {
    displaySuspension();
    apparatusSetup("option-suspension", "restart");
    overallIteration++;
    changeMessage();
  }
}

let instructionMessages = [
  "Click on the Light Source (Torch) to shine light on the different solutions placed in the row. Observe the path of light closely.",
];
let iter1 = -1;
function changeMessage() {
  iter1++;
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = instructionMessages[iter1];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = instructionMessages[iter1];
}

let iter2 = -1;
let observationMessages = [
  "Now observe the path of the light as it crosses all the three different kinds of beakers. The path of the light is visible inside the Colloid and Suspension beakers but is completely invisible in the Solution beaker. This is due to the Tyndall effect. The particles present in the Colloid or Suspension scatter the rays of light. This effect is not observed in true solutions as the diameter of the particles is too small to scatter the light to significant effect.",
];

function observeMessage() {
  iter2++;

  //"head-instructions" is the Heading of the Instructions HTML element that will be visible only in wide screens, i.e., width greater than 768px
  document.getElementById("head-instructions").innerHTML = "Observations";
  //"head-observations" is the Heading of the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("head-observations").innerHTML = "Observations";
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = observationMessages[iter2];
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = observationMessages[iter2];
}

function screenWidth() {
  divWidth = document.getElementById("workspace").clientWidth;
}

let originalSimulationHeight =
  document.getElementById("simulation").clientHeight;

document.getElementById("simulation").style.minHeight =
  originalSimulationHeight + "px";

let restartAnimation = false;

async function restart() {
  apparatusOptions.forEach(function (option) {
    document.getElementById(option).style.pointerEvents = "none";
  });
  document.getElementById("option-light").style.pointerEvents = "auto";

  document.getElementById("simulation").style.height = originalSimulationHeight;

  //"head-instructions" is the Heading of the Instructions HTML element that will be visible only in wide screens, i.e., width greater than 768px
  document.getElementById("head-instructions").innerHTML = "Instructions";
  //"head-observations" is the Heading of the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("head-observations").innerHTML = "Instructions";
  //"instruction" is the Instructions HTML element that will be visible only in wide screens, i.e, width greater than 768px
  document.getElementById("instruction").innerHTML = "";
  //"observation" is the Instructions HTML element that will be visible only in small screens, i.e., width smaller than 769px
  document.getElementById("observation").innerHTML = "";

  overallIteration = -3;
  iter2 = -1;
  iter1 = -1;
  setup = 0;

  setupMessage();
  document.getElementById("apparatus-bottles").style.display = "block";
  document.getElementById("torch-row").style.visibility = "hidden";

  restartAnimation = true;

  document.getElementById("light-torch").style.cursor = "default";

  //Resetting the Apparatus
  removeLabels();
  removeApparatus();
  removeLight();
}

let torch = document.getElementById("light-torch");
torch.addEventListener("click", shineLight);
