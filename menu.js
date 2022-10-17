import {
	AgedItem,
	BackstagePassItem,
	ConjuredItem,
	Item,
	LegendaryItem,
} from "./items.js";
import { getString } from "./userInput.js";

export async function mainMenu(shop) {
	console.clear();
	const input = await getString(
		"(a)dd new item or (p)rint items in stock: ",
		["a", "p"]
	);

	switch (input) {
		case "p":
			await printShopStock(shop);
			break;
		case "a":
			await addNewItemMenu(shop);
			break;
	}
}

export async function printShopStock(shop) {
	console.clear();
	shop.printStock();
	console.log("");
	await getString("Press Enter to go back...");
	shop.clearOnUpdate();
}

export async function getItemFromUser() {
	console.clear();
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

export async function addNewItemMenu(shop) {
	console.clear();
	const item = await getItemFromUser();
	shop.addItem(item);
}
