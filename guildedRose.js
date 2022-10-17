import { Shop } from "./shop.js";

function startShop(dayLength = 1000) {
	const shop = new Shop();

	setInterval(() => shop.updateShop, dayLength);
}

startShop();
