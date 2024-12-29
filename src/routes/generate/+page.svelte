<script>
	import Cropper from 'svelte-easy-crop';

	let imageSrc = null;

	function handleFileUpload(event) {
		const file = event.target.files[0];
		if (file) {
			imageSrc = URL.createObjectURL(file); // Create a temporary URL for the file
		}
	}

	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let doneCropping = false;
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
</script>

<div class="mx-8 my-4 flex flex-col">
	<h1 class="mb-3">Generate your movie poster</h1>
	<p class="mb-6">Enter the data of your desired move/TV show and we'll do the rest!</p>
	<form class="flex flex-col items-center justify-center">
		<div class="mb-4 flex w-full flex-col">
			<label for="title" class="text-xl font-semibold">Title</label>
			<input
				type="text"
				name="title"
				placeholder="Title"
				class="rounded-xl border px-2 py-1"
				required
			/>
		</div>
		<div class="mb-4 flex w-full flex-col">
			<label for="title" class="text-xl font-semibold">Image</label>
			<input
				type="file"
				name="image"
				class="rounded-xl border px-2 py-1"
				accept="image/*"
				required
				on:change={handleFileUpload}
			/>
		</div>
	</form>

	{#if imageSrc != null}
		<p>Your cropped image</p>
		<img src={imageSrc} alt="Uploaded cover image" class="w-[500px]" />
		<button
			type="submit"
			class="text-off-white-100 active:bg-cyan-1100 hover:bg-cyan-1000 mx-auto mt-4 w-24 rounded-xl bg-cyan-900 py-2 text-xl font-bold"
			>Next</button
		>
		{#if !doneCropping}
			<Cropper
				image={imageSrc}
				aspect={3 / 4}
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
				on:click={async () => {
					doneCropping = true;
					const croppedImageSrc = await getCroppedImage(crop, croppedAreaPixels);
					imageSrc = croppedImageSrc;
				}}>Crop</button
			>
		{/if}
	{/if}
</div>
