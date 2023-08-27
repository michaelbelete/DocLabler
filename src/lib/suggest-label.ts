export function suggestRandomWord(title: string, body: string): string {
	const words: string[] = [...title.split(' '), ...body.split(' ')];

	const randomIndex: number = Math.floor(Math.random() * words.length);

	return words[randomIndex];
}
