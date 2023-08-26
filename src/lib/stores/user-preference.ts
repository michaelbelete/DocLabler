import { browser } from '$app/environment';
import type { DocumentsSort, DocumentsView } from '$lib/types';
import { writable } from 'svelte/store';

export const PREFERENCE_KEY = 'preferences';

type UserPreference = {
	view: DocumentsView;
	sort: DocumentsSort;
};

const defaultPreference: UserPreference = {
	view: 'list',
	sort: 'asc'
};

const initialValue = browser
	? (JSON.parse(localStorage.getItem(PREFERENCE_KEY) || 'null') as UserPreference) ||
	  defaultPreference
	: defaultPreference;

const userPreference = writable<UserPreference>(initialValue);

userPreference.subscribe((value) => {
	if (!browser) return;
	localStorage.setItem(PREFERENCE_KEY, JSON.stringify(value));
});

export { userPreference };
