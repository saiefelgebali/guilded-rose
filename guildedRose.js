import {
	AgedItem,
	BackstagePassItem,
	ConjuredItem,
	Item,
	LegendaryItem,
} from "./items.js";
import { Shop } from "./shop.js";
import { getString } from "./userInput.js";

async function mainMenu(shop) {
	console.clear();
	const input = await getString(
		"(a)dd new item or (p)rint items in stock: ",
		["a", "p"]
	);

	switch (input) {
		case "p":
			console.log("");
			shop.printStock();
			console.log("");
			await getString("Press Enter to go back...");
			break;
		case "a":
			await addNewItemMenu(shop);
			break;
	}
}

async function getItemFromUser() {
	const type = await getString(
		"What type of item is this? (Normal, aged, legendary, backstage, conjured): ",
		["n", "a", "l", "b", "c"]
	);

	switch (type) {
		case "a":
			return await AgedItem.getItemFromUser();
		case "l":
			return await LegendaryItem.getItemFromUser();
		case "b":
			return await BackstagePassItem.getItemFromUser();
		case "c":
			return await ConjuredItem.getItemFromUser();
		default:
			return await Item.getItemFromUser();
	}
}

async function addNewItemMenu(shop) {
	console.clear();
	const item = await getItemFromUser();
	shop.addItem(item);
	shop.printStock();
}

function listenForUserInput(shop) {
	new Promise(async (resolve) => {
		await mainMenu(shop);
		resolve();
	}).then(() => listenForUserInput(shop));
}

function startShop(dayLength = 1000) {
	const shop = new Shop();

	new Promise(() => {
		setInterval(() => {
			shop.updateShop();
		}, dayLength);
	});

	listenForUserInput(shop);
}

startShop();
