<script>
	let { imgSrc, title, releaseDate, runtime, genres, director, actors, colorPalette, mediaType } =
		$props();
</script>

<div class="flex flex-col items-start px-6 pb-8 pt-2">
	<div class="mb-2 flex w-full justify-between">
		<div class="flex">
			{#each colorPalette as color}
				<div class="h-8 w-8" style="background-color: {color}"></div>
			{/each}
		</div>
		<img src="../that globe in a rectangle every design uses.png" alt="globe" class="h-8" />
	</div>
	<img src={imgSrc} alt="poster" class="mb-4 h-[800px] w-[600px] object-cover" />
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
