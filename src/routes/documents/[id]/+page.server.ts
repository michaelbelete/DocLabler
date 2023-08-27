import { error } from '@sveltejs/kit';
import { documents } from '$lib/mock/document';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db.server';

export const load: PageServerLoad = async ({ params }) => {
	const document = await db.document.findUnique({
		where: {
			id: parseInt(params.id)
		}
	});

	if (document) {
		return {
			document
		};
	}

	throw error(404, 'Document Not found');
};
