const order = [];

function orderButtonClicked() {
	updateShoppingBasket()
	const buttonarray = document.querySelectorAll("button.orderbutton");
	for (let i=0; i < buttonarray.length; i++) {
		buttonarray[i].addEventListener( "click", function(e){
			const target = e.target;
			const chosenAttraction = e.target.parentNode.parentNode.firstElementChild.innerHTML;
			const numofAdult = e.target.parentNode.firstElementChild.nextElementSibling
							.nextElementSibling.nextElementSibling.nextElementSibling.value;
			const numofChild = e.target.previousElementSibling.previousElementSibling.previousElementSibling
					.previousElementSibling.value;
			const numAdult = parseInt(`${numofAdult}`);
			const numChild = parseInt(`${numofChild}`);
			saveOrderInShoppingBasket(chosenAttraction, numAdult, numChild);
		  }
		);
	}
};

orderButtonClicked();

function saveOrderInShoppingBasket(chosenAttraction, numAdult, numChild) {
		updateOrder(chosenAttraction, numAdult, numChild);
		saveInLocalStorage();
};

function saveInLocalStorage() {
	window.localStorage.setItem('orderDetails', JSON.stringify(order));
	updateShoppingBasket();
}

function updateOrder(chosenAttraction, numAdult, numChild) {
	order.push({
		parkname: chosenAttraction,
		adultTickets: numAdult,
		childTickets: numChild
	});
};

function updateShoppingBasket() {
	const badge = document.getElementsByClassName("badge")[0];
	const orderDetails = JSON.parse(window.localStorage.getItem('orderDetails'));
	badge.innerHTML = orderDetails.length;
};
