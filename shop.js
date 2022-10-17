export class Shop {
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

	simulate(days) {
		for (let day = 1; day <= days; day++) {
			this.updateShop();
			this.printStock();
		}
	}
}
