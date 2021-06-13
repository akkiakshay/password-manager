const { balloon_hash } = require("./hashfunction");

const passwordButton = document.getElementById("submit");
const url = document.getElementById("url");
const masterPassword = document.getElementById("password");
const passwordLength = document.getElementById("password-length");
const passwordContainer = document.getElementById("password-container");
const copyButton = document.getElementById("copy");
const checkBox = document.querySelectorAll(".options");
const errorSpot = document.getElementById("error-spot");

const _Reinitialize = () => {
  url.value = "";
  masterPassword.value = "";
  passwordLength.value = "";
  clearAll()
};

const run_validation = () => {
  const isChecked = findCheckedElements();
  var reg_num = new RegExp('^[0-9]+$');
  if (!isChecked.length) {
    setData(errorSpot, "Please choose any Password Characteristics");
    return false;
  }
  if(url.value == "") {
    setData(errorSpot, "Input URL");
    return false;
  }
  if(masterPassword.value == "") {
    setData(errorSpot, "Input Master Password");
    return false;
  }
  if(!reg_num.test(passwordLength.value)) {
    setData(errorSpot, "Length should be a number");
    return false;
  }
  return true;
};

const setData = (container, text) => {
  container.style.display = "flex";
  container.firstElementChild.innerHTML = text;
};

const clearAll = () => {
    clear(passwordContainer)
    clear(errorSpot)
}

const clear = (container) => {
  container.style.display = "none";
  container.firstChild.innerHTML = "";
};

const findCheckedElements = () => {
  return [...checkBox].filter((cb) => cb.checked).map((box) => box.value);
};

const handleButtonClick = (e) => {
  e.preventDefault();
  if (run_validation()) {
    const options = findCheckedElements();
    const hashedValue = balloon_hash(
      masterPassword.value,
      url.value,
      passwordLength.value,
      options
    );
    _Reinitialize()
    setData(passwordContainer, hashedValue);
    copyButton.innerText = "Copy";
  }
};

const copyText = (e) => {
  const range = document.createRange();
  range.selectNode(passwordContainer.firstElementChild);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand("copy");
  e.target.innerText = "Copied!";
  window.getSelection().removeAllRanges();
  _Reinitialize()
};

passwordButton.addEventListener("click", handleButtonClick);
copyButton.addEventListener("click", copyText);
window.addEventListener("DOMContentLoaded", () => {
  _Reinitialize();
});
