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
				{ response: 'error', content: 'mediaType parameter is missing' },
				{ status: 400 }
			);
		}

		const searchUrl = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`;

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
		return json({ response: 'success', content: findDirector(results.crew) }, { status: 200 });
	} catch (err) {
		console.error(err);
		return json({ response: 'error', content: err.message }, { status: 500 });
	}
}

function findDirector(arr) {
	arr = arr.sort((a, b) => b.popularity - a.popularity);
	const director = arr.find((person) => person.known_for_department == 'Directing');
	return director.name;
}
