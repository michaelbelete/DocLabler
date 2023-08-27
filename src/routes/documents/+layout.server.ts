import { db } from '$lib/db.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './[id]/$types';

export const load: PageServerLoad = async () => {
	try {
		const documents = await db.document.findMany();
		return {
			documents
		};
	} catch (e: unknown) {
		throw error(500, `Error Occured while fetching documents. Detail ${e}`);
	}
};
