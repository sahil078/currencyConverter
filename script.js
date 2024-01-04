
const dropdown = document.querySelectorAll(".dropdown-selector");

let btn = document.querySelector("button");

let fromCurr = document.querySelector("#from-selector");

let toCurr = document.querySelector("#to-selector");
const amntDisp = document.querySelector(".amntSaver");

// looping all the select of form container
for(let select of dropdown){
    // getting the code of contry list from contryCode
    for (currCode in countryList){
        let newOption = document.createElement("Option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    // adding event listner to select
    select.addEventListener(('change')  , (evt)=>{
        updateFlag(evt.target);
    })
}

// function to update flag
const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

// adding eventListner to button
btn.addEventListener("click" , async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("#i-number");
    let amtVal = amount.value;
    console.log(amtVal)
    if(amtVal === " " || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    // creating url using base url
const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

let response = await fetch(url);
let data =await response.json();

let rate = data[toCurr.value.toLowerCase()];
let finalAmnt = rate * amtVal; 
console.log(finalAmnt);

amntDisp.innerText = `${amtVal} ${fromCurr.value} = ${finalAmnt} ${toCurr.value}`;
});


