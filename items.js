export class Item {
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
	constructor(name) {
		super(name, 0, 80, 80);
	}

	updateItem() {}
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
