class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}

	printItem(lengths) {
		const nameString = this.name.padStart(lengths.name);
		const sellInString = String(this.sellIn).padStart(lengths.sellIn);
		const qualityString = String(this.quality).padStart(lengths.quality);

		console.log(`${nameString} | ${sellInString} | ${qualityString}`);
	}
}

class Shop {
	constructor(items = []) {
		this.items = items;
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

	handleBackstagePass(item) {
		if (item.quality < 50) {
			if (item.sellIn < 11) {
				item.quality = item.quality + 1;
			}
			if (item.sellIn < 6) {
				item.quality = item.quality + 1;
			}
		}

		return item;
	}

	updateQuality() {
		for (let i = 0; i < this.items.length; i++) {
			if (
				this.items[i].name != "Aged Brie" &&
				this.items[i].name !=
					"Backstage passes to a TAFKAL80ETC concert"
			) {
				if (this.items[i].quality > 0) {
					if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
						this.items[i].quality = this.items[i].quality - 1;
					}
				}
			} else {
				if (this.items[i].quality < 50) {
					this.items[i].quality = this.items[i].quality + 1;
					if (
						this.items[i].name ==
						"Backstage passes to a TAFKAL80ETC concert"
					) {
						this.handleBackstagePass(this.items[i]);
					}
				}
			}
			if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
				this.items[i].sellIn = this.items[i].sellIn - 1;
			}
			if (this.items[i].sellIn < 0) {
				if (this.items[i].name != "Aged Brie") {
					if (
						this.items[i].name !=
						"Backstage passes to a TAFKAL80ETC concert"
					) {
						if (this.items[i].quality > 0) {
							if (
								this.items[i].name !=
								"Sulfuras, Hand of Ragnaros"
							) {
								this.items[i].quality =
									this.items[i].quality - 1;
							}
						}
					} else {
						this.items[i].quality =
							this.items[i].quality - this.items[i].quality;
					}
				} else {
					if (this.items[i].quality < 50) {
						this.items[i].quality = this.items[i].quality + 1;
					}
				}
			}
		}

		return this.items;
	}
}

const shop = new Shop([
	new Item("Sulfuras, Hand of Ragnaros", 0, 80),
	new Item("Aged Brie", 10, 0),
	new Item("Witchwood Apple", 3, 15),
	new Item("Diving Elixir", 11, 50),
	new Item("Backstage passes to a TAFKAL80ETC concert", 15, 5),
	new Item("Backstage passes to a TAFKAL80ETC concert", 25, 5),
	new Item("Backstage passes to an Ice Cream Boys concert", 25, 5),
	new Item("Conjured Wizard Hat", 20, 50),
	new Item("Conjured Wizard Robes", 16, 50),
]);

shop.printStock();
for (let day = 1; day < 21; day++) {
	shop.updateQuality();
	shop.printStock();
}
