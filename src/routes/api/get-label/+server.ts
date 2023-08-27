import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { GetLabelInput } from '$lib/types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/db.server';

export const POST: RequestHandler = async (event) => {
	const body: GetLabelInput = await event.request.json();

	try {
		const label = await db.label.findFirst({
			where: {
				visitorId: body.visitorId,
				documentId: body.documentId
			}
		});

		return json({
			data: label,
			message: 'Label fetched successfully'
		});
	} catch (e: unknown) {
		throw error(500, `${e}`);
	}
};
