<script>
	import PosterLayout from '$lib/PosterLayout.svelte';
	import { onMount } from 'svelte';
	import ColorThief from 'colorthief';
	import html2canvas from 'html2canvas';

	async function getMovieData(id, mediaType) {
		try {
			const response = await fetch(
				`http://localhost:5173/server/getContentData?id=${encodeURIComponent(id)}&mediaType=${encodeURIComponent(mediaType)}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return data.content;
		} catch (err) {
			console.error('Failed to fetch result:', err);
			return {};
		}
	}

	let container = $state(null);
	function downloadimage() {
		html2canvas(container, { allowTaint: true, scale: 4 }).then(function (canvas) {
			var link = document.createElement('a');
			document.body.appendChild(link);
			link.download = `minimal ${incomingData.title} poster.jpg`;
			link.href = canvas.toDataURL();
			link.target = '_blank';
			link.click();
		});
	}

	let movieData = $state(null);
	let incomingData = $state(null);
	let mediaType = $state('');
	onMount(async () => {
		incomingData = JSON.parse(localStorage.getItem('selectedData'));
		if (incomingData) {
			movieData = await getMovieData(incomingData.selectedID, incomingData.selectedMediaType);
		}
	});
</script>

<div class="my-4 flex flex-col items-center">
	<h1 class="mx-4">Your poster is complete!</h1>
	<p class="mb-2">Don't forget to download it!</p>
	<button
		class="text-off-white-100 hover:bg-cyan-1000 active:bg-cyan-1100 mb-3 rounded-xl bg-cyan-900 px-3 py-2 text-xl font-bold"
		onclick={downloadimage}>Download</button
	>
	<div class="border-dove-gray-100 mx-3 rounded-md border-2 p-2">
		{#if movieData}
			<div bind:this={container}>
				<PosterLayout
					title={incomingData.title}
					releaseDate={movieData.release_date}
					mediaType={incomingData.selectedMediaType}
					runtime={movieData.runtime}
					genres={movieData.genres}
					director={movieData.director}
					actors={movieData.actors}
					imgSrc={incomingData.imageSrc}
				/>
			</div>
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</div>
