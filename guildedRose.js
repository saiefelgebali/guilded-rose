import { Shop } from "./shop.js";
import { mainMenu } from "./menu.js";

async function listenForUserInput(shop) {
	await mainMenu(shop);
	listenForUserInput(shop);
}

function startShop(dayLength = 1000) {
	const shop = new Shop();

	setInterval(() => {
		shop.updateShop();
	}, dayLength);

	listenForUserInput(shop);
}

startShop();
