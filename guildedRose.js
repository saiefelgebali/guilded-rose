import {
	AgedItem,
	BackstagePassItem,
	ConjuredItem,
	Item,
	LegendaryItem,
} from "./items.js";
import { Shop } from "./shop.js";
import { getString } from "./userInput.js";

function mainMenu(shop) {
	console.clear();
	const input = getString("(a)dd new item or (p)rint items in stock: ", [
		"a",
		"p",
	]);

	switch (input) {
		case "p":
			shop.printStock();
			getString("Press Enter to go back...");
			break;
		case "a":
			addNewItemMenu(shop);
			break;
	}
}

function getItemFromUser() {
	const type = getString(
		"What type of item is this? (Normal, aged, legendary, backstage, conjured): ",
		["n", "a", "l", "b", "c"]
	);

	switch (type) {
		case "a":
			return AgedItem.getItemFromUser();
		case "l":
			return LegendaryItem.getItemFromUser();
		case "b":
			return BackstagePassItem.getItemFromUser();
		case "c":
			return ConjuredItem.getItemFromUser();
		default:
			return Item.getItemFromUser();
	}
}

function addNewItemMenu(shop) {
	console.clear();
	const item = getItemFromUser();
	shop.addItem(item);
}

function listenForUserInput(shop) {
	while (true) {
		mainMenu(shop);
	}
}

function startShop(dayLength = 1000) {
	const shop = new Shop();

	setInterval(() => shop.updateShop, dayLength);

	listenForUserInput(shop);
}

startShop();
