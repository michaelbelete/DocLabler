// prisma/seed.ts

import documents from './documents.json' assert { type: 'json' };
import { db } from '../src/lib/db.server';

async function main() {
	console.log(`Start seeding 🚀🚀...`);

	for (const d of documents) {
		const document = await db.document.create({
			data: {
				title: d.title,
				body: d.body,
				url: d.url
			}
		});

		console.log(`Created document with id: ${document.id}`);
	}
	console.log(`Seeding finished. 🥳🥳`);
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
