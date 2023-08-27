<script lang="ts">
	import AzIcon from '$lib/icons/AzIcon.svelte';
	import DocumentIcon from '$lib/icons/DocumentIcon.svelte';
	import GridIcon from '$lib/icons/GridIcon.svelte';
	import ListIcon from '$lib/icons/ListIcon.svelte';
	import ZaIcon from '$lib/icons/ZaIcon.svelte';
	import { sortByTitleAToZ, sortByTitleZToA } from '$lib/sort';
	import { userPreference } from '$lib/stores/user-preference';
	import type { PageData } from './$types';

	export let data: PageData;

	$: view = $userPreference.view;
	$: sort = $userPreference.sort;

	$: sortedDocuments =
		sort === 'asc' ? data.documents.sort(sortByTitleAToZ) : data.documents.sort(sortByTitleZToA);

	const toggleSort = () => {
		if ($userPreference.sort === 'asc') {
			userPreference.set({
				...$userPreference,
				sort: 'desc'
			});
		} else {
			userPreference.set({
				...$userPreference,
				sort: 'asc'
			});
		}
	};

	const toggleView = () => {
		if ($userPreference.view === 'list') {
			userPreference.set({
				...$userPreference,
				view: 'grid'
			});
		} else {
			userPreference.set({
				...$userPreference,
				view: 'list'
			});
		}
	};
</script>

<div class="flex flex-col gap-8">
	<section class="flex flex-col items-center justify-between gap-4 sm:flex-row">
		<h1 class="text-2xl font-semibold text-center md:text-3xl sm:text-left">
			Select a document to label
		</h1>
		<div class="flex items-center gap-1">
			<!-- Change layout between list and grid view -->
			<div class="items-center hidden sm:flex">
				{#if view === 'grid'}
					<button class="p-2 duration-200 rounded-full hover:bg-gray-300" on:click={toggleView}>
						<GridIcon />
					</button>
				{:else}
					<button class="p-2 duration-200 rounded-full hover:bg-gray-300" on:click={toggleView}>
						<ListIcon />
					</button>
				{/if}
			</div>
			<!-- Sort Button -->

			{#if sort === 'asc'}
				<button class="p-2 duration-200 rounded-full hover:bg-gray-300" on:click={toggleSort}>
					<ZaIcon />
				</button>
			{:else}
				<button class="p-2 duration-200 rounded-full hover:bg-gray-300" on:click={toggleSort}>
					<AzIcon />
				</button>
			{/if}
		</div>
	</section>

	<section class:list-container={view === 'list'} class:grid-container={view === 'grid'}>
		{#if !data.documents || (data.documents && data.documents.length === 0)}
			<p class="text-lg font-medium text-center">No documents found</p>
		{:else}
			{#each sortedDocuments as document}
				<a
					href="/documents/{document.id}"
					title="Select {document.title}"
					class:list-item={view === 'list'}
					class:grid-item={view === 'grid'}
				>
					<div class="block" class:sm:hidden={view === 'grid'}>
						<DocumentIcon />
					</div>
					<h2 class:list-item-title={view === 'list'} class:grid-item-title={view === 'grid'}>
						{document.title}
					</h2>
					<p class:list-item-body={view === 'list'} class:grid-item-body={view === 'grid'}>
						{#if document.body.length > 100}
							{document.body.slice(0, 100)}...
						{:else}
							{document.body}
						{/if}
					</p>
				</a>
			{/each}
		{/if}
	</section>
</div>

<style lang="postcss">
	.list-container {
		@apply flex flex-col items-center gap-6;
	}

	.list-item {
		@apply bg-white shadow-lg px-6 rounded-md hover:bg-primary hover:bg-opacity-20 hover:scale-y-105 hover:duration-300 flex sm:flex-row flex-col py-2 sm:py-3 items-center gap-2 md:gap-6 w-full;
	}

	.list-item-title {
		@apply text-lg md:text-xl w-full md:max-w-2xl lg:max-w-4xl sm:truncate text-center sm:text-left text-dark;
	}

	.list-item-body {
		@apply hidden;
	}

	.grid-container {
		@apply grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-8;
	}

	.grid-item {
		@apply bg-white shadow-lg rounded-md px-6 py-8 flex-col flex gap-4 items-center hover:bg-primary hover:bg-opacity-20 hover:scale-x-105 hover:duration-300;
	}

	.grid-item-title {
		@apply text-xl font-normal text-center sm:text-left sm:font-semibold;
	}

	.grid-item-body {
		@apply text-sm hidden sm:block;
	}
</style>
