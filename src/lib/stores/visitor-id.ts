import { readable } from 'svelte/store';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { browser } from '$app/environment';

export const visitorId = readable<string | null>(null, (set) => {
	if (!browser) return;

	const fpPromise = FingerprintJS.load();
	fpPromise.then((fp) => {
		fp.get().then((result) => {
			set(result.visitorId);
		});
	});
});
