import type { Document } from './types';

export const sortByTitleAToZ = (a: Document, b: Document) => a.title.localeCompare(b.title);
export const sortByTitleZToA = (a: Document, b: Document) => b.title.localeCompare(a.title);
