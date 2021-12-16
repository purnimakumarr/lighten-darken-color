const projectName = "Lighten/Darken Color";
console.log(projectName);

////////////////////////////////////
// MAKE CUSTOM TOGGLE BUTTON WORK
let isLighten = true;
const btnEl = document.querySelector(".btn");
btnEl.addEventListener("click", function () {
  if (btnEl.classList.contains("btn-off")) {
    btnEl.classList.remove("btn-off");
    btnEl.classList.add("btn-on");
    isLighten = false;
  } else if (btnEl.classList.contains("btn-on")) {
    btnEl.classList.remove("btn-on");
    btnEl.classList.add("btn-off");
    isLighten = true;
  }
});

const inputColorEl = document.querySelector(".user-input-color");
const rangeEl = document.querySelector(".range");
const toggleBtnEl = document.querySelector(".btn");
const displayInputColor = document.querySelector(".display-input-color");
const displayAlteredColor = document.querySelector(".display-altered-color");
const alteredHexCodeEl = document.querySelector(".altered-color-hex");

function hexToRgb(color) {
  const hexCode = color
    .match(
      /[0-9abcdefABCDEF][0-9abcdefABDCEF][0-9abcdefABCDEF][0-9abcdefABCDEF][0-9fabcdeABCDEF][0-9abcdefABCDEF]/g
    )[0]
    .split("");

  const array = hexCode.map((item) => {
    switch (item) {
      case "a":
      case "A":
        return "10";
        break;
      case "b":
      case "B":
        return "11";
        break;
      case "c":
      case "C":
        return "12";
        break;
      case "d":
      case "D":
        return "13";
        break;
      case "e":
      case "E":
        return "14";
        break;
      case "f":
      case "F":
        return "15";
        break;
      default:
        return item;
    }
  });
  console.log(array);

  const red = parseInt(array[0]) * 16 + parseInt(array[1]);
  const green = parseInt(array[2]) * 16 + parseInt(array[3]);
  const blue = parseInt(array[4]) * 16 + parseInt(array[5]);

  return [red, green, blue];
}

function rgbToHex(rgbValue) {
  let alteredHexCode = ["#"];
  for (let i in rgbValue) {
    alteredHexCode.push(Math.floor(rgbValue[i] / 16));
    alteredHexCode.push(Math.floor(rgbValue[i] % 16));
  }

  const display = alteredHexCode.map((item) => {
    switch (item) {
      case 10:
        return "a";
        break;
      case 11:
        return "b";
        break;
      case 12:
        return "c";
        break;
      case 13:
        return "d";
        break;
      case 14:
        return "e";
        break;
      case 15:
        return "f";
        break;
      default:
        return `${item}`;
    }
  });
  console.log("display");
  console.log(display);

  //update altered color hex code
  alteredHexCodeEl.textContent = display.join("");
}

function lightenColor(rgbValue, lightenBy) {
  const sortedArray = rgbValue.sort(function (a, b) {
    return b - a;
  });
  console.log(rgbValue);
  let offset = Math.ceil(sortedArray[0] * lightenBy);
  console.log(offset);
  const alteredRgb = rgbValue.map((item) => {
    if (item + offset <= 255) return item + offset;
    else return 255;
  });
  console.log(alteredRgb);
  displayAlteredColor.style.backgroundColor = `rgb(${alteredRgb[0]}, ${alteredRgb[1]}, ${alteredRgb[2]})`;

  //update altered color hex code
  const alteredHexCode = rgbToHex(alteredRgb);
}

function darkenColor(rgbValue, darkenBy) {
  const sortedArray = rgbValue.sort(function (a, b) {
    return b - a;
  });
  console.log(rgbValue);
  let offset = Math.ceil(sortedArray[0] * darkenBy);
  console.log(offset);
  const alteredRgb = rgbValue.map((item) => {
    if (item - offset >= 0) return item - offset;
    else return 0;
  });
  console.log(alteredRgb);
  displayAlteredColor.style.backgroundColor = `rgb(${alteredRgb[0]}, ${alteredRgb[1]}, ${alteredRgb[2]})`;

  //update altered color hex code
  const alteredHexCode = rgbToHex(alteredRgb);
}

////////////////////////////////////
// WHEN THE INPUT COLOR FIELD CHANGES
inputColorEl.addEventListener("change", function (event) {
  let inputColor;
  if (event.target.value == "") {
    inputColor = "#de5254";
    displayAlteredColor.style.backgroundColor = "#ffabad";
  } else inputColor = event.target.value;
  if (!inputColor.startsWith("#"))
    alert("Please enter a valid hex code (should start with #).");
  else if (inputColor.length === 7) {
    displayInputColor.style.backgroundColor = inputColor;
    const rgbValue = hexToRgb(inputColor);
    const percentage = rangeEl.value / 100;

    if (isLighten) {
      lightenColor(rgbValue, percentage);
    } else {
      darkenColor(rgbValue, percentage);
    }
  } else alert("Please enter the full 6 digit hex code.");
});

////////////////////////////////////
// WHEN THE RANGE CHANGES
rangeEl.addEventListener("change", function (event) {
  document.querySelector("#percentage-label").textContent =
    event.target.value + "%";
  let inputColor;
  if (inputColorEl.value === "") {
    inputColor = "#de5254";
    displayAlteredColor.style.backgroundColor = "#ffabad";
  } else inputColor = inputColorEl.value;

  const rgbValue = hexToRgb(inputColor);
  const percentage = rangeEl.value / 100;

  if (isLighten) {
    lightenColor(rgbValue, percentage);
  } else {
    darkenColor(rgbValue, percentage);
  }
});
