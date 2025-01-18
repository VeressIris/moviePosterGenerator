<script>
	const year = new Date().getFullYear();
</script>

<div class="bg-off-white-200 flex w-full items-center justify-between px-5 py-4 2xl:px-24">
	<div>
		<p class="max-w-48 text-xl font-semibold sm:w-fit lg:max-w-fit">Minimalist Poster Generator</p>
		<p class="text-sm">@ Copyright {year}</p>
	</div>
	<div class="flex flex-col">
		<div class="flex justify-between">
			<!-- need these anchors in divs so that the underline animates -->
			<div>
				<a
					href="/"
					class="border-dove-gray-400 hover:text-dove-gray-400 mr-2 transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2"
					>Home</a
				>
			</div>
			<div>
				<a
					href="/generate"
					class="border-dove-gray-400 hover:text-dove-gray-400 transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2"
					>Generate</a
				>
			</div>
		</div>
		<div>
			<a
				href="https://github.com/VeressIris/moviePosterGenerator"
				target="_blank"
				class="border-dove-gray-400 hover:text-dove-gray-400 mr-2 transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2 sm:mr-6"
				>GitHub</a
			>
			<a
				href="mailto:midnightdove.dev@gmail.com
         ?subject=Movie%20Poster%20Generator%20Feedback"
				target="_blank"
				class="border-dove-gray-400 hover:text-dove-gray-400 transition-all duration-[50ms] ease-in-out hover:scale-0 hover:cursor-pointer hover:border-b-2"
			>
				Send Feedback
			</a>
		</div>
	</div>
</div>
