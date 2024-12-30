<script>
	import PosterLayout from '$lib/PosterLayout.svelte';
</script>

<div class="mx-8 my-4 flex flex-col items-center">
	<h1>Your poster is complete!</h1>
	<p class="mb-2">Don't forget to download it!</p>
	<button
		class="text-off-white-100 hover:bg-cyan-1000 active:bg-cyan-1100 mb-6 rounded-xl bg-cyan-900 px-3 py-2 text-xl font-bold"
		>Download</button
	>
	<div class="border-dove-gray-100 rounded-md border-2 p-2">
		<PosterLayout
			imgSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercosmos.com%2Fw%2Ffull%2F7%2F2%2F4%2F172506-2984x2000-desktop-hd-the-shawshank-redemption-background-image.jpg&f=1&nofb=1&ipt=23696381a15f291c9257783d9703a13fff365db20e528a93112744605c4c1d8a&ipo=images"
			title="THE SHAWSHANK REDEMPTION"
			releaseDate="1994"
			runtime="142 min"
			genres={['Drama', 'Historical']}
			director="Frank Darabont"
			actors={['Tim Robbins', 'Morgan Freeman']}
			colorPalette={['rgb(0,0,0)', '#FFFFFF', '#C0C0C0', '#808080', '#FF0000']}
		/>
	</div>
</div>
