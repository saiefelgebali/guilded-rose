import {
	Item,
	AgedItem,
	BackstagePassItem,
	ConjuredItem,
	LegendaryItem,
} from "./items.js";

class Shop {
	constructor(items = []) {
		this.items = items;
		this.day = 0;
	}

	getHeaders() {
		return {
			name: `End of day ${this.day}`,
			sellIn: "Sel",
			quality: "Qua",
		};
	}

	getMaxItemPropertyLength(key) {
		if (this.items.length < 1) return 0;
		const entryStrings = this.items.map((i) => new String(i[key]));
		entryStrings.push(this.getHeaders()[key]);
		const lengths = entryStrings.map((s) => s.length);
		return lengths.sort((a, b) => b - a)[0];
	}

	printStockHeader(lengths) {
		const headers = this.getHeaders();
		const nameHeader = headers.name.padEnd(lengths.name);
		const sellInHeader = headers.sellIn.padStart(lengths.sellIn);
		const qualityHeader = headers.quality.padStart(lengths.quality);
		console.log(`\n${nameHeader} | ${sellInHeader} | ${qualityHeader}`);
	}

	printStock() {
		if (this.items.length < 1) {
			console.log("There are no items in stock");
			return;
		}

		const lengths = {
			name: this.getMaxItemPropertyLength("name"),
			sellIn: this.getMaxItemPropertyLength("sellIn"),
			quality: this.getMaxItemPropertyLength("quality"),
		};

		this.printStockHeader(lengths);

		this.items.forEach((item) => {
			item.printItem(lengths);
		});
	}

	simulate(days) {
		for (let day = 1; day <= days; day++) {
			this.updateShop();
			this.printStock();
		}
	}

	updateShop() {
		this.day++;
		this.updateStock();
	}

	updateStock() {
		this.items.forEach((item) => {
			item.updateItem();
		});

		return this.items;
	}
}

const shop = new Shop([
	new LegendaryItem("Sulfuras, Hand of Ragnaros"),
	new AgedItem("Aged Brie", 10, 0),
	new Item("Witchwood Apple", 3, 15),
	new Item("Diving Elixir", 11, 50),
	new BackstagePassItem("Backstage passes to a TAFKAL80ETC concert", 15, 5),
	new BackstagePassItem("Backstage passes to a TAFKAL80ETC concert", 25, 5),
	new BackstagePassItem(
		"Backstage passes to an Ice Cream Boys concert",
		25,
		5
	),
	new ConjuredItem("Conjured Wizard Hat", 20, 50),
	new ConjuredItem("Conjured Wizard Robes", 16, 50),
]);

shop.simulate(20);
