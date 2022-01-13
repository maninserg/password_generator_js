// DOM elements

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listen
generateEl.addEventListener('click',() => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper,
        hasLower,
        hasNumbers,
        hasSymbols,
        length);
})

 // Generate password function
 function generatePassword(lower, upper, number, symbol, len) {
    let generatePassword = '';
    const typesCount = lower + upper + number + symbol;

 //   console.log(typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );
 //   console.log(typesArr);
    
    if (typesCount === 0){
        return '';
    } 

    for (let i=0; i < len; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
//            console.log(funcName)
            generatePassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatePassword.slice(0, len);
    return finalPassword;
 }
 
 // Copy password to clipboard
 clipboardEl.addEventListener('click', () => {
     const textarea = document.createElement('textarea');
     const password = resultEl.innerText;

     if (!password){
         return;
     }

     textarea.value = password;
     document.body.appendChild(textarea);
     textarea.select();
     document.execCommand('copy');
     textarea.remove();
     alert("password copied to clipboard!");
 })


// Generator functions - https://net-comber.com/charset.html


function getRandomLower() {
    
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)]
}


