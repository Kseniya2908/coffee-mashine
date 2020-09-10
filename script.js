"use script"

function makeCoffee(name, price) {
  // console.log(name, price);
  let balance = document.querySelector(".form-control");
  // console.log( balance.value );
  if (balance.value >=price) { //balance.value = balance.value - price
    balance.value = price;
    balance.style.backgroundColor = "";
    changeDisplayText(`Ваш ${name} готовится`);
  } else {
    balance.style.backgroundColor = "red";
    changeDisplayText("Недостаточно средств");
  }
}



function changeDisplayText(message) {
let displayText = document.querySelector(".display-text");
displayText.innerHTML = message;
}
  
  



