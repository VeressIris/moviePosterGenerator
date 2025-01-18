<script>
	import Navbar from '$lib/Navbar.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
