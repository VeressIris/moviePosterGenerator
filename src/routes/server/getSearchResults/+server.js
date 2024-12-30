import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	try {
		const title = url.searchParams.get('title');
		if (!title) {
			return json({ response: 'error', content: 'Title parameter is missing' }, { status: 400 });
		}

		const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(title)}&include_adult=false&language=en-US&page=1`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${API_KEY}`
			}
		};

		const response = await fetch(searchUrl, options);

		if (!response.ok) {
			const errorMessage = `Failed to fetch: ${response.status} ${response.statusText}`;
			console.error(errorMessage);
			return json({ response: 'error', content: errorMessage }, { status: response.status });
		}

		const results = await response.json();
		const filteredResults = results.results.map((result) => ({
			id: result.id,
			name: result.name || result.title, // Handle both movies and TV shows
			release_date: result.release_date || result.first_air_date // Handle both movies and TV shows
		}));
		return json({ response: 'success', content: filteredResults.slice(0, 5) }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ response: 'error', content: err.message }, { status: 500 });
	}
}
