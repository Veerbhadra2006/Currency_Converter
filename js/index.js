// const BASE_URL = "https://v6.exchangerate-api.com/v6/621df41d843dd611b81596bb/pair/EUR/INR/10";
const BASE_URL = "https://v6.exchangerate-api.com/v6/621df41d843dd611b81596bb/pair";


const btn = document.querySelector("form button");
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
	for(currCode in countryList){
		let newOption = document.createElement("option");
		newOption.innerHTML = currCode;
		if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";

    } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
    }
		select.append(newOption);
	}

	select.addEventListener("change",(evt) =>{
		updateFlag(evt.target)
	})
}

const updateFlag = (element) =>{
	let currCode = element.value;
	let countryCode = countryList[currCode];
	let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
	let image = element.parentElement.querySelector("img");
	image.src = newSrc; 
}

btn.addEventListener("click" ,async (evt) => {
	evt.preventDefault();
	let amount = document.querySelector(".amount input");
	let amountValue= amount.value;
	if(amountValue === "" || amountValue <1){
		amountValue =1;
		amount.value = "1";
	}
	// console.log(amountValue)

	// console.log(fromCurr.value, toCurr.value);
	// // const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`
	const url = `${BASE_URL}/${fromCurr.value}/${toCurr.value}/${amountValue}`;
	let response = await fetch(url);
	let data = await response.json();
	let rate = data.conversion_result;
	// console.log(data);

	let finalAmount = rate;

console.log(finalAmount);

	msg.innerText = `${amountValue}  ${fromCurr.value}   =   ${ finalAmount}  ${toCurr.value}`

	
})
