import { getInt, getString } from "./userInput.js";

export class Item {
	static async createItemFromUserInput() {
		const name = await getString("Name: ");
		const sellIn = await getInt("Sell in days: ");
		const quality = await getInt("Quality: ");
		return new this(name, sellIn, quality);
	}

	constructor(name, sellIn, quality, maxQuality = 50) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
		this.maxQuality = maxQuality;
	}

	isExpired() {
		return this.sellIn < 0;
	}

	clampQuality(newQuality) {
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
		this.quality = this.clampQuality(this.getNewQuality());
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

export class AgedItem extends Item {
	constructor(name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	getNewQuality() {
		if (this.isExpired()) {
			return this.quality + 2;
		}
		return this.quality + 1;
	}
}

export class LegendaryItem extends Item {
	static async createItemFromUserInput() {
		const name = await getString("Name: ");
		return new LegendaryItem(name);
	}

	constructor(name) {
		super(name, 0, 80, 80);
	}

	updateItem() {
		// Legendary items don't change
	}
}

export class BackstagePassItem extends Item {
	constructor(name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	getNewQuality() {
		if (this.sellIn < 0) {
			return 0;
		}

		if (this.sellIn < 5) {
			return this.quality + 3;
		}

		if (this.sellIn < 10) {
			return this.quality + 2;
		}

		return this.quality + 1;
	}
}

export class ConjuredItem extends Item {
	constructor(name, sellIn, quality) {
		super(name, sellIn, quality);
	}

	getNewQuality() {
		if (this.isExpired()) {
			return this.quality - 4;
		}
		return this.quality - 2;
	}
}
