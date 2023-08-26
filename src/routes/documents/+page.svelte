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
	<section class="flex justify-between sm:flex-row flex-col gap-4 items-center">
		<h1 class="font-semibold md:text-3xl text-2xl text-center sm:text-left">
			Select a document to label
		</h1>
		<div class="flex gap-1 items-center">
			<!-- Change layout between list and grid view -->
			<div class="hidden sm:flex items-center">
				{#if view === 'grid'}
					<button class="hover:bg-gray-300 p-2 rounded-full duration-200" on:click={toggleView}>
						<GridIcon />
					</button>
				{:else}
					<button class="hover:bg-gray-300 p-2 rounded-full duration-200" on:click={toggleView}>
						<ListIcon />
					</button>
				{/if}
			</div>
			<!-- Sort Button -->

			{#if sort === 'asc'}
				<button class="hover:bg-gray-300 p-2 rounded-full duration-200" on:click={toggleSort}>
					<ZaIcon />
				</button>
			{:else}
				<button class="hover:bg-gray-300 p-2 rounded-full duration-200" on:click={toggleSort}>
					<AzIcon />
				</button>
			{/if}
		</div>
	</section>

	<section class:list-container={view === 'list'} class:grid-container={view === 'grid'}>
		{#each sortedDocuments as document, i}
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
