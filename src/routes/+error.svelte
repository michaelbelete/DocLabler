<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} • DocLabeler</title>
</svelte:head>
<div
	class="relative bg-gray-300 min-h-[calc(100vh-188px)] flex flex-col items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 sm:py-10 py-8"
>
	<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
		{$page.error?.message ?? 'Error'}
	</h1>
	<p class="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
		{$page.status == 404
			? "Sorry, we couldn't find what you're looking for."
			: 'Sorry, something went wrong.'}
	</p>
	<a href="/" class="text-primary hover:underline underline-offset-2"> Back to home </a>
</div>
