/**
 * 1. När användaren klickar på en knapp:
 *  1.1 Spara värdet på den knappen i en variabel
 *  1.2 Skriv ut variabeln i displayen
 * 2. När användaren klickar på lika-tecknet:
 *  2.1 Summera värdet av variablerna
 *  2.2 Skriv ut summan i displayen
 * 3. Rensa displayen när användaren klickar på reset
 */

/** Skapa en array av alla divar (siffrorna och operatorerna) */
const numbers = document.querySelectorAll('div');
const buttons = Array.from(numbers);

/** Lägg till en eventlistener på varje element i arrayen
 * anropa funktionen för att visa vad man tryckt på i displayen
 */
for (const button of buttons) {
  button.addEventListener('click', function () {
    showInDisplay(buttons.indexOf(button));
  });
}

/** Eftersom divarna 10-13 är operatorer visa istället det tecknet i displayen */
function showInDisplay(button) {
  if (button > 9) {
    if (button == 10) {
      button = '+';
    } else if (button == 11) {
      button = '-';
    } else if (button == 12) {
      button = 'x';
    } else if (button == 13) {
      button = '/';
    }
  }
  /** Lägg bara till om längden på strängen inte överstiger 10 */
  if (document.querySelector('.display').innerHTML.length < 10) {
    document.querySelector('.display').innerHTML += button;
  }
}

/** När användaren klickar på likamed-knappen, skicka in värdet på displayen till kalkylatorn */
document.querySelector('.equals').addEventListener('click', function () {
  const calculation = document.querySelector('.display').innerHTML;
  /** Kalkylera bara om det står något i displayen */
  if (calculation != '') {
    /** Kalkylera bara om sista tecknet är en siffra */
    if (!isNaN(calculation.slice(-1))) {
      calculate(calculation);
    }
  }
  console.log(calculation);
});

/** Kalkylera med eval */
function calculate(calculation) {
  /** Eftersom X inte är en operator ersätt den med * (stjärna) */
  const result = eval(calculation.replace(/x/g, '*'));
  /** Korta ner resultatet */
  const newResult = shortenCalculation(result);
  displayAnswer(newResult);
}

/** Se till att talet inte är för stort, max 10 tecken */
function shortenCalculation(result) {
  /** Gör om till sträng för att använda substring */
  const number = String(result).substring(0, 11);
  /** Runda av resultatet */
  const newResult = roundResult(number);
  return newResult;
}

/** Kolla siffra 11 i strängen för att veta om talet ska rundas av upp eller ner */
function roundResult(result) {
  const checkNumber = String(result).substring(10, 11);
  let numberToChange = String(result).substring(9, 10);
  /** Om siffran är 5 eller högre lägg till 1 på 10:e siffran */
  if (checkNumber > 4) {
    numberToChange++;
  }
  /** Returnera siffra 1-9 + siffran som eventuellt har ändrats */
  return String(result).substring(0, 9) + numberToChange;
}
/** Visa summan i displayen */
function displayAnswer(result) {
  document.querySelector('.display').innerHTML = result;
}

/** Rensa displayen */
document.querySelector('button').addEventListener('click', function () {
  document.querySelector('.display').innerHTML = '';
});
