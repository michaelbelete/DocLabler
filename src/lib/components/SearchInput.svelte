<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Document } from '@prisma/client';

	export let documents: Document[];

	let search = '';

	$: searchResult = documents
		.filter((document) => {
			console.log('result', document.title.toLowerCase().includes(search.toLowerCase()));
			return document.title.toLowerCase().includes(search.toLowerCase());
		})
		.splice(0, 5);

	const navigateAndClearSearch = (id: number) => {
		goto(`/documents/${id}`);
		search = '';
	};
</script>

<div
	class="relative flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
>
	<div class="w-full">
		<label for="search" class="sr-only">Search</label>
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					class="w-5 h-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<input
				id="search"
				name="search"
				class="block w-full py-3 pl-10 pr-3 bg-white border-0 rounded-md text-dark ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-primary sm:text-lg sm:leading-6"
				placeholder="Search"
				bind:value={search}
				type="search"
			/>
		</div>
		{#if search.length > 0}
			<div class="absolute left-0 z-30 w-full bg-white shadow-md rounded-b-md top-16">
				<div class="flex flex-col gap-2 py-4">
					{#if searchResult.length === 0}
						<p class="px-6 py-3 text-center text-gray-500">No results found</p>
					{:else}
						{#each searchResult as document}
							<button
								title="select: {document.title}"
								class="flex w-full gap-2 px-6 py-3 truncate duration-300 hover:bg-primary hover:bg-opacity-30"
								on:click={() => navigateAndClearSearch(document.id)}
							>
								<svg
									class="w-5 h-5 text-dark"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
										clip-rule="evenodd"
									/>
								</svg>
								<p class="max-w-lg truncate">
									{document.title}
								</p>
							</button>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</div>
</div>
