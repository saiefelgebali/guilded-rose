import PromptSync from "prompt-sync";

const prompt = PromptSync({ sigint: true });

import readline from "readline";

function askQuestion(query) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) =>
		rl.question(query, (ans) => {
			rl.close();
			resolve(ans);
		})
	);
}

export function getInt(message) {
	const inputString = prompt(message);
	const inputInt = parseInt(inputString);
	if (Number.isNaN(inputInt)) {
		return getInt(message);
	}
	return inputInt;
}

export async function getString(message, options) {
	const inputString = await askQuestion(message);

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
