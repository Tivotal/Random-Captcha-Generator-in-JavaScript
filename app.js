/* Created by Tivotal */

let captchaDisplay = document.querySelector(".captcha_box input");
let refreshBtn = document.querySelector(".refresh_button");
let captchaInput = document.querySelector(".captcha_input input");
let message = document.querySelector(".message");
let submitBtn = document.querySelector(".button");

let captchaText = null;

let generateCaptcha = () => {
  let randomString = Math.random().toString(36).substring(2, 7);
  let randomStringArray = randomString.split("");
  let changeString = randomStringArray.map((char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char
  );
  captchaText = changeString.join("   ");
  captchaDisplay.value = captchaText;
};

let refreshCaptcha = () => {
  generateCaptcha();
  captchaInput.value = "";
  updateUI();
};

let updateUI = () => {
  //toggle submit button disable class based on input value
  submitBtn.classList.toggle("disabled", !captchaInput.value);

  message.classList.remove("active");
};

let validateCaptcha = () => {
  captchaText = captchaText
    .split("")
    .filter((char) => char !== " ")
    .join("");
  message.classList.add("active");

  //checking the entered the captcha is correct or not
  if (captchaInput.value === captchaText) {
    message.innerText = "Entered captcha is correct";
    message.style.color = "#4070f4";
  } else {
    message.innerText = "Entered captcha is not correct";
    message.style.color = "#ff2525";
  }
};

//function to generate captcha on page load
generateCaptcha();

refreshBtn.addEventListener("click", refreshCaptcha);
captchaInput.addEventListener("keyup", updateUI);
submitBtn.addEventListener("click", validateCaptcha);
