"use script"
let progressBar = document.querySelector(".progress-bar");
let bigCap = document.querySelector(".cup");
let state = "idle";
//переменная state отвечает за текущее состояние кофе-машины.
// Возможные значения:
// "idle" - ожидание;
// "cooking" - готовка;
// "ready" - кофе готов, но пока не забрали
// после того, как кофе заберут он возвращается в значение "idle"


function makeCoffee(name, price, element) {
  if (state !="idle") {
    return
  }
  // console.log(name, price);
  let balance = document.querySelector(".form-control");
  console.log(element);
  if (+balance.value >=price) { //balance.value = balance.value - price
    balance.value = price;
    balance.style.backgroundColor = "";
    changeDisplayText(`Ваш ${name} готовится`);
    state = "cooking";
    let coffeeCup = element.querySelector("img");
    let cupSrc = coffeeCup.getAttribute("src");
    console.log(cupSrc);
    bigCap.setAttribute("src", cupSrc); //меняем кружку в центре на то, что мы готовим
    bigCup.style.display = "inline";
    
    let readyPercent = 0;
    let cookingInterval = setInterval(function() {
    readyPercent++; 
   // console.log(readyPercent);]
   requestAnimationFrame(function() {
     bigCap.style.opacity = readyPercent + "%";
   progressBar.style.width = readyPercent + "%";
   })
    changeDisplayText(`Ваш ${name} готовится ${readyPercent}%`);
    if(readyPercent >= 100) {
      clearInterval(cookingInterval);
      changeDisplayText(`Ваш ${name} готов`);
      state = "ready";
      bigCap.style.cursor = "pointer";
    bigCap.onclick = function() {
      takeCoffee();
    }
    }
    }, 30)
  } else {
    balance.style.backgroundColor = "red";
    changeDisplayText("Недостаточно средств");
  }
}
function takeCoffee() {
  bigCap.style.display = "none";
  bigCap.style.opacity = 0; //забираем кружку
  bigCap.style.cursor = "";
  progressBar.style.width = 0;
  
  changeDisplayText("Выберите кофе");
  bigCap.onclick = null;
  state = "idle";
}

function changeDisplayText(message) {
let displayText = document.querySelector(".display-text");
displayText.innerHTML = message;
}
  
  //------------------Drag'n'Drop-----------------------------
  let money = document.querySelectorAll(".money img");
  for(let i = 0; i < money.length; i++) {
   let bill = money[i];
    }
for(let bill of money) {
  bill.onmousedown = function(event) {
  takeMoney(event, bill);  
  }
}
function takeMoney(event, bill) {
  event.preventDefault()  // приостанавливает реакцию браузера на события
  let mouseX = event.clientX;
  let mouseY = event.clientY;
   bill.style.transform = "rotate(90deg)";
  let billCoords = bill.getBoundingClientRect(); // указываем размер и координаты купюры
  console.log(billCoords);
 
  bill.style.position = "absolute";
  bill.style.top = mouseY - billCoords.width/2 + "px";
  bill.style.left = mouseX - billCoords.height/2 + "px";
  
  window.onmousemove = function(event) { //купюра ездит за мышью
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  bill.style.top = mouseY - billCoords.width/2 + "px";
  bill.style.left = mouseX - billCoords.height/2 + "px";
}
bill.onmouseup = function(event) { //отжимаем купюру
window.onmousemove = null;
if ( inAtm(bill) ) {
  let balance = document.querySelector(".form-control");
  balance.value = +balance.value + +bill.dataset.cost;
  bill.remove(); // деньги принимает в автомат
  console.log(bill.dataset.cost);
}
//console.log(inAtm(bill))
}
}

function inAtm(bill) {
  let atm = document.querySelector(".atm");
  let atmCoords = atm.getBoundingClientRect(); // считывает текущее положение и ширину и высоту элементов px
  let billCoords = bill.getBoundingClientRect(); 
  
  let atmLeftTopX = atmCoords.x
  let atmLeftTopY = atmCoords.y
  
  let atmLeftBottomX = atmCoords.x
  let atmLeftBottomY = atmCoords.y + atmCoords.height/3;
  
  let atmRightTopX = atmCoords.x + atmCoords.width;
  let atmRightTopY = atmCoords.y;
  
  let billLeftTopX = billCoords.x;
  let billLeftTopY = billCoords.y;
  
  let billRightTopX = billCoords.x + billCoords.width;
  let billRightTopY = billCoords.y;
  
  // console.log(atmLeftTopX, atmLeftTopY, atmLeftBottomX, atmLeftBottomY, atmRightTopX, atmRightTopY, billLeftTopX, billLeftTopY, billRightTopX, billRightTopY);
  
  if (billLeftTopX > atmLeftTopX
  && billLeftTopY > atmLeftTopY
  && billLeftTopY < atmLeftBottomY
  && billRightTopX < atmRightTopX)
  {
    return true;
    } else {
      return false;
    }
}


/*Создание элементов*/
function createCoin(nominal) {
  let coinSrc = "img/10rub.png";
  let coin = document.createElement("img");
  coin.setAttribute("src", coinSrc); /*установили связь картинки и значения*/
coin.style.width = "50px";
coin.style.height = "50px";
coin.style.position = "absolute";

  let changeContainer = document.querySelector(".change-container");
  let containerCoords = changeContainer.getBoundingClientRect();
  coin.style.top = Math.floor(Math.random() * (containerCoords.height - 50)) + "px";
   coin.style.left = Math.floor(Math.random() * (containerCoords.width - 50)) + "px";
  
  changeContainer.append(coin); /*в конец div добавляет тег img*/
  

}