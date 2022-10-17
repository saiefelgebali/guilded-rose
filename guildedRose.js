class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
		this.maxQuality = 50;
	}

	isExpired() {
		return this.sellIn < 0;
	}

	updateQuality() {
		if (this.isExpired()) {
			this.quality += -2;
			return;
		}
		this.quality += -1;
	}

	updateItem() {
		this.sellIn--;
		this.updateQuality();
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

	getMaxNameLength() {
		if (this.items.length < 1) return 0;
		const lengths = this.items.map((i) => i.name.length);
		return lengths.sort((a, b) => b - a)[0];
	}

	getMaxSellInLength() {
		if (this.items.length < 1) return 0;
		const lengths = this.items.map((i) => String(i.sellIn).length);
		return lengths.sort((a, b) => b - a)[0];
	}

	getMaxQualityLength() {
		if (this.items.length < 1) return 0;
		const lengths = this.items.map((i) => String(i.quality).length);
		return lengths.sort((a, b) => b - a)[0];
	}

	printStock() {
		console.log("\n");

		if (this.items.length < 1) {
			console.log("There are no items in stock");
			return;
		}

		const lengths = {
			name: this.getMaxNameLength(),
			sellIn: this.getMaxSellInLength(),
			quality: this.getMaxQualityLength(),
		};

		this.items.forEach((item) => {
			item.printItem(lengths);
		});
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
						if (this.items[i].sellIn < 11) {
							if (this.items[i].quality < 50) {
								this.items[i].quality =
									this.items[i].quality + 1;
							}
						}
						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < 50) {
								this.items[i].quality =
									this.items[i].quality + 1;
							}
						}
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
