const countrylist = {    
    EUR: "DE", // Eurozone countries use 'EU' as a generic representation
      USD: "US", // United States Dollar
      GBP: "GB", // British Pound
      JPY: "JP", // Japanese Yen
      CAD: "CA", // Canadian Dollar
      AUD: "AU", // Australian Dollar
      CHF: "CH", // Swiss Franc
      CNY: "CN", // Chinese Yuan
      INR: "IN", // Indian Rupee
      SGD: "SG"  // Singapore Dollar"
};

const Base_URL = "https://api.frankfurter.app/latest?amount=&from=&to=";

let message = document.querySelector(".mssg p");
let dropdowns= document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");


for (let select of dropdowns) {
    for (currCode in countrylist) {
        let newOptions = document.createElement("option");
        newOptions.innerHTML = currCode ;
        newOptions.value =  currCode;
        
        select.append(newOptions);
    }
    
    select.addEventListener("change",(event) => {
        updateFlag(event.target);
    });
}

document.getElementById("from").value = "USD";
document.getElementById("to").value = "INR";

// update flags immediately for defaults
updateFlag(document.getElementById("from"));
updateFlag(document.getElementById("to"));


function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countrylist[currCode];
    

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    
};

btn.addEventListener("click",  (event) => {
    event.preventDefault();
    let amount = document.querySelector("#amount-input");
    let amtVal = amount.value;
    if (amtVal === '' || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    //console.log(amtVal);
    renderMsg(amtVal);
     
});

async function renderMsg (amtVal = 1) {

    const URL = `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data);

    let rate = data.rates[toCurr.value];

    let unitRate = rate / amtVal ;
    let formattedUnitRate = Number(unitRate).toLocaleString();
    let formattedAmt = Number(amtVal).toLocaleString();
    let formattedRate = Number(rate).toLocaleString();
    // let realRate = parseFloat(rate).toFixed(2);
    // console.log(realRate);
    message.innerHTML = `
    1 ${fromCurr.value} = ${formattedUnitRate} ${toCurr.value} <br> <br>
    ${formattedAmt} ${fromCurr.value}= ${formattedRate} ${toCurr.value}`;
}

window.addEventListener("load", () => {
    renderMsg(1);
})