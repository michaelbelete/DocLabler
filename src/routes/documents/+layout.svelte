<script lang="ts">
	import SearchInput from '$lib/components/SearchInput.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="overflow-hidden bg-gray-200 isolate">
	<header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
		<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
				<div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
					<div class="flex items-center flex-shrink-0">
						<a href="/documents">
							<img class="w-auto h-11" src="/images/logo.svg" alt="DocLabeler" />
						</a>
					</div>
				</div>
				<div class="flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6">
					<SearchInput documents={data.documents} />
				</div>
			</div>
		</div>
	</header>

	<main
		class="relative min-h-[calc(100vh-188px)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:py-10 py-8"
	>
		<slot />
	</main>
</div>
