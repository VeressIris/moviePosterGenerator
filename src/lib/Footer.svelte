<script>
	const year = new Date().getFullYear();
</script>

<div class="bg-off-white-200 flex w-full items-center justify-between px-5 py-4 2xl:px-24">
	<div>
		<p class="max-w-48 text-xl font-semibold sm:w-fit lg:max-w-fit">Minimalist Poster Generator</p>
		<p class="text-sm xl:text-base">© Copyright {year}</p>
	</div>
	<div class="flex flex-col">
		<div class="flex justify-between">
			<!-- need these anchors in divs so that the underline animates -->
			<div>
				<a
					href="/"
					class="border-dove-gray-400 hover:text-dove-gray-400 mr-2 text-base transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2 md:text-lg"
					>Home</a
				>
			</div>
			<div>
				<a
					href="/generate"
					class="border-dove-gray-400 hover:text-dove-gray-400 text-base transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2 md:text-lg"
					>Generate</a
				>
			</div>
		</div>
		<div class="flex justify-between">
			<!-- need these anchors in divs so that the underline animates -->
			<div>
				<a
					href="https://github.com/VeressIris/moviePosterGenerator"
					target="_blank"
					class="border-dove-gray-400 hover:text-dove-gray-400 mr-2 text-base transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2 sm:mr-6 md:text-lg"
					>GitHub</a
				>
			</div>
			<div class="text-end">
				<a
					href="mailto:midnightdove.dev@gmail.com
			 ?subject=Movie%20Poster%20Generator%20Feedback"
					target="_blank"
					class="border-dove-gray-400 hover:text-dove-gray-400 text-base transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2 md:text-lg"
				>
					Send Feedback
				</a>
			</div>
		</div>
	</div>
</div>
