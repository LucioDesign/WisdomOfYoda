"use strict";
console.log("hello there");

const YODA_API_URL = "https://api.funtranslations.com/translate/yoda.json";
const CUOTE_API_URL = "https://api.adviceslip.com/advice";

const btn = document.getElementById("btn");
const heroText = document.getElementById("hero-title");
let advice;

  // calling for translation
const getURL = (text) => `"${YODA_API_URL}?text=${text}"`;

  // Error handling function
const errorHandler = (error) => {
  console.error(error);
  heroText.innerHTML = "Yoda is tired, try again later";
  heroText.style.fontSize = "2.5rem";

  btn.innerHTML = `ask again`;
};
  // calling advice phrase
const getAdvice = async () => {
  const response = await fetch(CUOTE_API_URL);

  const tip = await response.json();

  return tip.slip.advice;
};

  // translating advice
async function yodaTranslate() {
  try {
    advice = await getAdvice();

    const response = await fetch(getURL(advice));

    const json = await response.json();

    advice = json.contents.translated;
    console.log(advice);

    heroText.innerHTML = `"${advice}"`;
    heroText.style.fontSize = "2.5rem";

    btn.innerHTML = `ask again`;
  } catch (error) {
    errorHandler(error);
  }
}

btn.onclick = yodaTranslate;
