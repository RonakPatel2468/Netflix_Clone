import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

// Search for a person in the TMDB and update the user's search history
export async function searchPerson(req, res) {
	const { query } = req.params;
	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// If no results found, send a 404 response
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// Update user's search history with the first result
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});

		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Search for a movie in TMDB and update the user's search history
export async function searchMovie(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// If no results found, send a 404 response
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// Update user's search history with the first result
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});
		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Search for a TV show in TMDB and update the user's search history
export async function searchTv(req, res) {
	const { query } = req.params;

	try {
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// If no results found, send a 404 response
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// Update user's search history with the first result
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});
		res.json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Get the user's search history
export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Remove an item from the user's search history by ID
export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params;
	id = parseInt(id);

	try {
		// Remove the specified item from the search history
		await User.findByIdAndUpdate(req.user._id, {
			$pull: { searchHistory: { id: id } },
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
