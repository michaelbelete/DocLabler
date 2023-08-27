<script lang="ts">
	import SparkIcon from '$lib/icons/SparkIcon.svelte';
	import { visitorId } from '$lib/stores/visitorId';
	import type { GetLabelInput, LabelInput, Response } from '$lib/types';
	import type { Label } from '@prisma/client';
	import type { PageData } from './$types';
	import { toasts } from 'svelte-toasts';

	export let data: PageData;

	let label = '',
		isLoading = false,
		error: string | undefined = undefined;
	$: document = data.document;

	const fetchLabels = async () => {
		if (!$visitorId) return;
		isLoading = true;

		const requestInput: GetLabelInput = {
			documentId: document.id,
			visitorId: $visitorId
		};

		try {
			const response = await fetch('/api/get-label', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestInput)
			});

			if (response.ok) {
				// Handle success if needed
				const responseData: Response<Label> = await response.json();
				label = responseData.data.label;
			} else {
				error = 'Unexpected Error Occured. Please try again';
			}
		} catch (error) {
			error = `Unexpected Error Occured. Please try again. Detail: ${error}`;
		}

		isLoading = false;
	};

	const handleUpsertLabel = async () => {
		if (!$visitorId) return;
		isLoading = true;
		error = undefined;

		if (!label) {
			error = 'Label is required';
			isLoading = false;
			return;
		}

		const newLabel: LabelInput = {
			label,
			visitorId: $visitorId,
			documentId: document.id
		};

		try {
			const response = await fetch('/api/upsert-label', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newLabel)
			});

			if (response.ok) {
				// Handle success if needed
				const responseData: Response<Label> = await response.json();
				toasts.success({
					title: 'Success',
					description: responseData.message,
					placement: 'top-right'
				});
				label = responseData.data.label;
			} else {
				error = 'Unexpected Error Occured. Please try again';
			}
		} catch (error) {
			error = `Unexpected Error Occured. Please try again. Detail: ${error}`;
		}

		isLoading = false;
	};

	$: if ($visitorId) {
		fetchLabels();
	}
</script>

<div class="flex flex-col gap-12">
	<div>
		<nav class="sm:hidden" aria-label="Back">
			<a
				href="/documents"
				class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
			>
				<svg
					class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
						clip-rule="evenodd"
					/>
				</svg>
				Back
			</a>
		</nav>
		<nav class="hidden sm:flex" aria-label="Breadcrumb">
			<ol role="list" class="flex items-center space-x-2">
				<li>
					<div class="flex">
						<a href="/documents" class="text-sm font-medium text-gray-500 hover:text-gray-700"
							>Documents</a
						>
					</div>
				</li>
				<li>
					<div class="flex items-center">
						<svg
							class="h-5 w-5 flex-shrink-0 text-gray-400"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
								clip-rule="evenodd"
							/>
						</svg>
						<a
							href="/documents/{document.id}"
							class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">{document.title}</a
						>
					</div>
				</li>
			</ol>
		</nav>
		<div class="mt-2 md:flex md:items-center md:justify-between">
			<div class="min-w-0 flex-1">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
					title={document.title}
				>
					{document.title}
				</h2>
			</div>
			<div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
				<a href={document.url} class="btn-primary" target="_blank">View Detail</a>
			</div>
		</div>
	</div>

	<div class="bg-white rounded-md shadow-md py-6 px-6">
		<p>{document.body}</p>
	</div>
	<div class="bg-white bottom-0 w-full py-8 px-4 rounded-t-md shadow-sm">
		<div class="max-w-xl mx-auto flex flex-col gap-4">
			<div>
				<div class="flex flex-row justify-between">
					<label for="label" class="block text-sm sm:text-lg font-medium leading-6 text-gray-900"
						>Label</label
					>
					<button
						type="button"
						class="text-sm sm:text-lg flex gap-2 items-center leading-6 text-primary hover:underline underline-offset-2 hover:brightness-110"
						><SparkIcon /> Suggest me a label</button
					>
				</div>
				<div class="mt-2">
					<input
						type="label"
						name="label"
						id="label"
						bind:value={label}
						class="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-primary text-sm sm:text-lg sm:leading-6"
						class:ring-primary={error}
						class:ring-2={error}
						placeholder="What will you label this document?"
						disabled={isLoading}
					/>
				</div>
				{#if error}
					<p class="text-sm text-red-600 mt-1">{error}</p>
				{/if}
			</div>
			<button
				type="submit"
				class="btn-primary disabled:brightness-75"
				class:animate-pulse={isLoading}
				on:click={handleUpsertLabel}
				disabled={isLoading}
				>{#if isLoading} Submitting {:else} Submit {/if}</button
			>
		</div>
	</div>
</div>
