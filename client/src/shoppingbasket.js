const templateNode = document.getElementById("ticket");
const mainElement = document.querySelector("main");
const payButton = document.getElementById("finalizepaymentbutton");
const orderDetails = JSON.parse(window.localStorage.getItem('orderDetails'));
let orderKeyName;

function getOrderFromShoppingBasket() {
  updateShoppingBasket();
  for (let i = 0; i < orderDetails.length; i++) {
    const clone = document.importNode(templateNode.content, true)

    const elem = clone.querySelectorAll("div");
    elem[0].innerText = orderDetails[i].parkname;
    elem[1].innerText = elem[1].innerText + orderDetails[i].adultTickets;
    elem[2].innerText = elem[2].innerText + orderDetails[i].childTickets;

    cancelOrder(clone, i);

    mainElement.prepend(clone);
  }
};

getOrderFromShoppingBasket();

function updateShoppingBasket() {
	const badge = document.getElementsByClassName("badge")[0];
  badge.innerHTML = orderDetails.length;
};

function cancelOrder(clone, index) {
  const cancelButton = clone.querySelector("button");
  cancelButton.addEventListener("click", function() {
    mainElement.remove(clone);
    orderDetails.splice(index, 1);
    window.localStorage.setItem('orderDetails', JSON.stringify(orderDetails))
    updateShoppingBasket();
    location.reload();
    });
};

payButton.addEventListener('click', finalizeOrder);

async function finalizeOrder() {
  try {
    const response = await fetch('/api/placeorder');
    if(response.ok){
      const jsonResponse = await response.json();
      renderResponse(jsonResponse);
      uponFinalizing();
    }
  } catch(error) {
    console.log(error);
  }
};

function uponFinalizing() {
  localStorage.clear();
  updateShoppingBasket();
  window.location.replace("orderplaced.html");
};
