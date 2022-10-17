import PromptSync from "prompt-sync";

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
