import PromptSync from "prompt-sync";
import { ClearRule, InFrontOfRule, ReverseRule, WordRule } from "./rules.js";

const prompt = PromptSync({ sigint: true });

export function getInt(message) {
	const inputString = prompt(message);
	const inputInt = parseInt(inputString);
	if (Number.isNaN(inputInt)) {
		return getInt(message);
	}
	return inputInt;
}

export function getString(message, options) {
	const inputString = prompt(message);

	if (options) {
		const validOption = !!options.find((o) =>
			inputString.toLowerCase().startsWith(o.toLowerCase())
		);

		if (!validOption) {
			return getString(message, options);
		}
	}

	return inputString;
}

export function getRules() {
	const rules = [];

	let addNewRule = true;
	while (addNewRule) {
		rules.push(getRule());
		addNewRule = getString("Add a new rule? (y/N) ") === "y";
	}

	return rules;
}

export function getRule() {
	console.log("What rule would you like to add?");
	const ruleType = getString(
		"You can choose (W)ord, (C)lear, (I)nFront or (R)everse): ",
		["w", "c", "i", "r"]
	);

	switch (ruleType[0].toLowerCase()) {
		case "w":
			return WordRule.getRule();
		case "c":
			return ClearRule.getRule();
		case "i":
			return InFrontOfRule.getRule();
		case "r":
			return ReverseRule.getRule();
		default:
			throw new Error("Did not enter a valid rule name");
	}
}
