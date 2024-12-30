<script>
	import { onMount } from 'svelte';
	import ColorThief from 'colorthief';

	let { imgSrc, title, releaseDate, runtime, genres, director, actors, mediaType } = $props();

	let colorPalette = $state([]);
	function getColorPalette() {
		const colorThief = new ColorThief();
		const img = document.getElementById('cover');
		if (img.complete) {
			colorPalette = colorThief.getPalette(img, 5);

			const hsv = colorPalette.map((color) => {
				const [r, g, b] = color;
				return rgbToHsv(r, g, b);
			});

			colorPalette.sort((a, b) => {
				const c1 = rgbToHsv(...a); // Convert the first color to HSV
				const c2 = rgbToHsv(...b); // Convert the second color to HSV
				return c2.h - c1.h; // Sort in descending order of hue
			});

			colorPalette = colorPalette.map((color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
			console.log(colorPalette);
		} else {
			img.addEventListener('load', function () {
				colorThief.getPalette(img, 5);
			});
		}
	}

	function rgbToHsv(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const delta = max - min;

		let h,
			s,
			v = max;

		// Calculate Hue
		if (delta === 0) {
			h = 0; // No color (grayscale)
		} else if (max === r) {
			h = ((g - b) / delta + (g < b ? 6 : 0)) % 6;
		} else if (max === g) {
			h = (b - r) / delta + 2;
		} else {
			h = (r - g) / delta + 4;
		}
		h *= 60; // Convert to degrees

		// Calculate Saturation
		s = max === 0 ? 0 : delta / max;

		return {
			h: h,
			s: s,
			v: v
		};
	}

	onMount(() => {
		getColorPalette();
	});
</script>

<div class="flex flex-col items-start px-6 py-8">
	<div class="mb-2 flex w-full justify-between">
		<div class="flex">
			{#each colorPalette as color}
				<div class="h-8 w-8" style="background-color: {color}"></div>
			{/each}
		</div>
		<img src="../that globe in a rectangle every design uses.png" alt="globe" class="h-8" />
	</div>
	<img src={imgSrc} id="cover" alt="poster" class="mb-4 h-[800px] w-[600px] object-cover" />
	<div class="flex flex-col">
		<div class="mb-2 flex items-end">
			<h1 class="mr-2">{title}</h1>
			<p class="text-xl">{releaseDate.split('-')[0]}</p>
		</div>
		<p>Genres: <span class="font-bold">{genres.map((genre) => ` ${genre.toUpperCase()}`)}</span></p>
		{#if mediaType == 'tv'}
			<p>Running for: <span class="font-bold">{runtime} SEASONS</span></p>
		{:else}
			<p>Runtime: <span class="font-bold">{runtime} MINUTES</span></p>
		{/if}
		<p>Directed by: <span class="font-bold">{director.toUpperCase()}</span></p>
		<p class="mt-2">
			Starring: <span class="font-bold">{actors.map((actor) => ` ${actor.toUpperCase()}`)}</span>
		</p>
	</div>
</div>
