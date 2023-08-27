import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { LabelInput } from '$lib/types';
import { error } from '@sveltejs/kit';
import { db } from '$lib/db.server';

export const POST: RequestHandler = async (event) => {
	const body: LabelInput = await event.request.json();

	try {
		const checkLabelExist = await db.label.findFirst({
			where: {
				visitorId: body.visitorId,
				documentId: body.documentId
			}
		});

		if (!checkLabelExist) {
			const newLabel = await db.label.create({
				data: body
			});

			return json({
				data: newLabel,
				message: 'Label inserted successfully'
			});
		} else {
			const updatedLabel = await db.label.update({
				where: {
					id: checkLabelExist.id
				},
				data: {
					label: body.label
				}
			});

			return json({
				data: updatedLabel,
				message: 'Label updated successfully'
			});
		}
	} catch (e: unknown) {
		throw error(500, `${e}`);
	}
};
