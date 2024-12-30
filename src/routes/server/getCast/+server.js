import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	try {
		const id = url.searchParams.get('id');
		const mediaType = url.searchParams.get('mediaType');
		if (!id) {
			return json({ response: 'error', content: 'ID parameter is missing' }, { status: 400 });
		}
		if (!mediaType) {
			return json(
				{ response: 'error', content: 'MediaType parameter is missing' },
				{ status: 400 }
			);
		}

		let searchUrl = '';
		if (mediaType === 'tv') {
			searchUrl = `https://api.themoviedb.org/3/tv/${id}/season/1/credits?language=en-US`;
		} else {
			searchUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
		}

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
		// filtered response is an array of the 3 most popular cast members
		const filteredResponse = results.cast
			.sort((a, b) => b.popularity - a.popularity) // sort by popularity (descending)
			.slice(0, 3)
			.map((result) => {
				return {
					name: result.name
				};
			});
		return json({ response: 'success', content: filteredResponse }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ response: 'error', content: err.message }, { status: 500 });
	}
}
