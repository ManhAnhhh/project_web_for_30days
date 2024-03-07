const input = document.querySelector(".input");
const userLabel = document.querySelector(".user-label");
const generateQrButton = document.querySelector(".generate-qr");
let qrSrc = document.querySelector(".qr-src");

const focusInput = () => (userLabel.style.backgroundColor = "#fbf9f1");
input.onclick = () => focusInput();

generateQrButton.onclick = () => generateQr();
input.addEventListener("keydown", function (e) {
  if (event.keyCode === 13) generateQr();
});

const checkValueInput = () => {
  if (input.value == "") {
    alert("You must enter a value");
    focusInput();
    input.focus();
    return false;
  }
  return true;
};

const generateQr = () => {
  if (!checkValueInput()) return;
  qrSrc.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    input.value;
  document.querySelector(".qr-img img").style.display = "inline";
};
