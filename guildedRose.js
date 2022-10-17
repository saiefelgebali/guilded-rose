class Item {
	constructor(name, sellIn, quality, maxQuality = 50) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
		this.maxQuality = maxQuality;
	}

	isExpired() {
		return this.sellIn < 0;
	}

	getQualityInBounds(newQuality) {
		newQuality = Math.min(newQuality, this.maxQuality);
		newQuality = Math.max(newQuality, 0);
		return newQuality;
	}

	getNewQuality() {
		if (this.isExpired()) {
			return this.quality - 2;
		}

		return this.quality - 1;
	}

	updateQuality() {
		this.quality = this.getQualityInBounds(this.getNewQuality());
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

class AgedItem extends Item {
	constructor(name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	getNewQuality() {
		return this.quality + 1;
	}
}

class LegendaryItem extends Item {
	constructor(name) {
		super(name, 0, 80, 80);
	}

	updateItem() {}
}

class BackstagePass extends Item {
	constructor(name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	getNewQuality() {}
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
	// new Item("Witchwood Apple", 3, 15),
	// new Item("Diving Elixir", 11, 50),
	// new Item("Backstage passes to a TAFKAL80ETC concert", 15, 5),
	// new Item("Backstage passes to a TAFKAL80ETC concert", 25, 5),
	// new Item("Backstage passes to an Ice Cream Boys concert", 25, 5),
	// new Item("Conjured Wizard Hat", 20, 50),
	// new Item("Conjured Wizard Robes", 16, 50),
]);

function simulateShop(days) {
	for (let day = 0; day < days; day++) {
		shop.updateStock();
		shop.printStock();
	}
}

simulateShop(3);
