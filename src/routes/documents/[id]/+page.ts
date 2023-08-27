import { error } from '@sveltejs/kit';
import { documents } from '$lib/mock/document';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const document = documents.find((d) => d.id === parseInt(params.id));

	if (document) {
		return {
			document
		};
	}

	throw error(404, 'Document Not found');
};
