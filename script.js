// Make suctom toggle button work
const btnEl = document.querySelector(".btn");
btnEl.addEventListener("click", function () {
  if (btnEl.classList.contains("btn-off")) {
    btnEl.classList.remove("btn-off");
    btnEl.classList.add("btn-on");
  } else if (btnEl.classList.contains("btn-on")) {
    btnEl.classList.remove("btn-on");
    btnEl.classList.add("btn-off");
  }
});
