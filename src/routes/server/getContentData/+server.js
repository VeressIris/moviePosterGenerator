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

		const searchUrl = `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`;
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

		const result = await response.json();
		const actors = await getActors(id, mediaType);
		let director = '';
		if (mediaType == 'movie') {
			director = await getDirector(id);
		} else {
			director = result.created_by[0].name;
		}
		const filteredResponse = {
			name: result.name || result.title, // Handle both movies and TV shows
			release_date: result.release_date || result.first_air_date, // Handle both movies and TV shows
			genres: result.genres.map((genre) => genre.name),
			director: director,
			actors: actors,
			runtime: result.runtime || result.number_of_seasons
		};
		return json({ response: 'success', content: filteredResponse }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ response: 'error', content: err.message }, { status: 500 });
	}
}

async function getActors(id, mediaType) {
	try {
		const response = await fetch(
			`http://localhost:5173/server/getCast?id=${id}&mediaType=${mediaType}`
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch cast: ${response.status} ${response.statusText}`);
		}
		const result = await response.json();
		return result.content.map((actor) => actor.name);
	} catch (err) {
		console.error(err);
		return [];
	}
}

async function getDirector(id) {
	try {
		const response = await fetch(`http://localhost:5173/server/getMovieDirector?id=${id}`);
		if (!response.ok) {
			throw new Error(`Failed to fetch cast: ${response.status} ${response.statusText}`);
		}
		const result = await response.json();
		return result.content;
	} catch (err) {
		console.error(err);
		return '';
	}
}
