import { fetchFromTMDB } from "../services/tmdb.service.js";

// Fetch trending TV shows for the day
export async function getTrendingTv(req, res) {
	try {
		// Fetch trending TV shows data from TMDB API
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

		// Select a random TV show from the results
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
		
		console.log("Fetched trending TV show:", randomMovie);

		res.json({ success: true, content: randomMovie });
	} catch (error) {
		console.error("Error fetching trending TV:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Fetch TV show trailers based on TV show ID
export async function getTvTrailers(req, res) {
	const { id } = req.params;
	try {
		// Fetch trailers for a specific TV show
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
		
		console.log("Fetched TV trailers for show ID:", id);

		res.json({ success: true, trailers: data.results });
	} catch (error) {
		if (error.message.includes("404")) {
			console.warn(`No trailers found for TV show ID: ${id}`);
			return res.status(404).send(null);
		}

		console.error("Error fetching TV trailers:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Fetch detailed info for a specific TV show based on ID
export async function getTvDetails(req, res) {
	const { id } = req.params;
	try {
		// Fetch details of a specific TV show
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
		
		console.log("Fetched TV details for show ID:", id);

		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			console.warn(`No details found for TV show ID: ${id}`);
			return res.status(404).send(null);
		}

		console.error("Error fetching TV details:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Fetch similar TV shows based on a specific TV show ID
export async function getSimilarTvs(req, res) {
	const { id } = req.params;
	try {
		// Fetch similar TV shows from TMDB API
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
		
		console.log("Fetched similar TV shows for show ID:", id);

		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		console.error("Error fetching similar TV shows:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Fetch TV shows based on a specific category
export async function getTvsByCategory(req, res) {
	const { category } = req.params;
	try {
		// Fetch TV shows from a specific category
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
		
		console.log("Fetched TV shows for category:", category);

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error("Error fetching TV shows by category:", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
