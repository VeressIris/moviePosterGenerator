<script>
	import Cropper from 'svelte-easy-crop';
	import { goto } from '$app/navigation';

	let imageSrc = $state(null);

	function handleFileUpload(event) {
		doneCropping = false;
		const file = event.target.files[0];
		if (file) {
			imageSrc = URL.createObjectURL(file); // Create a temporary URL for the file
		}
	}

	let crop = $state({ x: 0, y: 0 });
	let zoom = $state(1);
	let doneCropping = $state(false);
	let croppedAreaPixels = null;

	async function getCroppedImage(crop, croppedAreaPixels) {
		const image = await loadImage(imageSrc);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = croppedAreaPixels.width;
		canvas.height = croppedAreaPixels.height;

		ctx.drawImage(
			image,
			croppedAreaPixels.x, // start x
			croppedAreaPixels.y, // start y
			croppedAreaPixels.width, // crop width
			croppedAreaPixels.height, // crop height
			0,
			0,
			croppedAreaPixels.width,
			croppedAreaPixels.height
		);

		// Convert the canvas to a data URL
		return new Promise((resolve) => {
			canvas.toBlob((blob) => {
				resolve(URL.createObjectURL(blob));
			}, 'image/jpeg');
		});
	}

	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = (err) => reject(err);
			img.src = src;
		});
	}

	let title = $state('');
	let results = $state([]);
	let searching = $state(false);
	let selectedID = $state(null);
	let selectedMediaType = $state('');
	async function getResults() {
		try {
			const response = await fetch(
				`https://minimalist-poster-generator.vercel.app/server/getSearchResults?title=${encodeURIComponent(title)}`,
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
			console.error('Failed to fetch results:', err);
			return [];
		}
	}
</script>

<svelte:head>
	<title>Minimalist Posters | Generate</title>
</svelte:head>

<div class="mx-8 my-4 flex h-screen flex-col 2xl:mx-24">
	<h1 class="mb-3">Generate your movie poster</h1>
	<p class="mb-6">Enter the data of your desired move/TV show and we'll do the rest!</p>
	<div class="flex flex-wrap items-start">
		<form class="flex w-full max-w-xl flex-col items-center justify-center">
			<div class="mb-4 flex w-full flex-col">
				<label for="title" class="text-xl font-semibold">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="ex: Pulp Fiction"
					class="rounded-xl border px-2 py-1"
					required
					bind:value={title}
					oninput={async (e) => {
						searching = true;
						if (e.target.value != '') {
							results = await getResults(e.target.value);
							console.log(results);
						} else {
							searching = false;
						}
					}}
				/>
				{#if searching}
					<div>
						<p class="font-semibold">Are you looking for</p>
						{#each results as result}
							<button
								onclick={() => {
									searching = false;

									title = result.name;
									selectedID = result.id;
									selectedMediaType = result.media_type;
								}}
								type="button"
								class="border-dove-gray-400 hover:bg-off-white-200 w-full rounded-xl border-b-2 px-2 text-start hover:cursor-pointer"
							>
								<p>
									<span class="font-semibold">{result.name}</span> ({result.release_date.split(
										'-'
									)[0]})
								</p>
							</button>
						{/each}
					</div>
				{/if}
			</div>
			<div class="mb-4 flex w-full flex-col">
				<label for="image" class="text-xl font-semibold">Image</label>
				<input
					type="file"
					id="image"
					name="image"
					class="rounded-xl border px-2 py-1"
					accept="image/*"
					required
					onchange={handleFileUpload}
				/>
			</div>
		</form>
		{#if imageSrc != null}
			<div class="ml-24">
				<p>Your cropped image</p>
				<img src={imageSrc} alt="Uploaded cover image" class="w-[500px]" />
				<div class="flex w-full justify-center">
					<button
						type="submit"
						class="text-off-white-100 active:bg-cyan-1100 hover:bg-cyan-1000 mx-auto mt-4 w-24 rounded-xl bg-cyan-900 py-2 text-xl font-bold"
						onclick={() => {
							const data = { selectedID, title, imageSrc, selectedMediaType };
							localStorage.setItem('selectedData', JSON.stringify(data));
							goto('/complete');
						}}>Next</button
					>
				</div>
			</div>
			{#if !doneCropping}
				<Cropper
					image={imageSrc}
					aspect={0.84 / 1}
					zoomSpeed={0.1}
					bind:crop
					bind:zoom
					on:cropcomplete={(e) => {
						croppedAreaPixels = e.detail.pixels;
					}}
				/>
				<!-- TODO: Change button position with media queries -->
				<button
					class="text-off-white-100 active:bg-cyan-1100 hover:bg-cyan-1000 absolute right-4 top-[calc(20vh+1rem)] w-24 rounded-xl bg-cyan-900 py-2 text-xl font-bold"
					onclick={async () => {
						doneCropping = true;
						const croppedImageSrc = await getCroppedImage(crop, croppedAreaPixels);
						imageSrc = croppedImageSrc;
					}}>Crop</button
				>
			{/if}
		{/if}
	</div>
</div>
