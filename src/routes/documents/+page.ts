import type { PageLoad } from './$types';
import { documents } from '$lib/mock/document';
export const load: PageLoad = () => {
	return {
		documents
	};
};
