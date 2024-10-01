import { fetchFromTMDB } from "../services/tmdb.service.js";

// Controller to get a trending movie
export async function getTrendingMovie(req, res) {
    try {
        // Fetch trending movies from TMDB API
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        console.log(`Fetched ${data.results?.length} trending movies`);


        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
        console.log(`Selected random movie: ${randomMovie?.id} - ${randomMovie?.title}`);

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        console.error("Error in getTrendingMovie:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Controller to get trailers of a specific movie by ID
export async function getMovieTrailers(req, res) {
    const { id } = req.params;

    try {
        // Fetch movie trailers from TMDB API
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        console.log(`Fetched ${data.results?.length} trailers for movie ID: ${id}`);

        res.json({ success: true, trailers: data.results });
    } catch (error) {
        console.error(`Error in getMovieTrailers for movie ID: ${id}`, error.message);

        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Controller to get detailed information about a specific movie by ID
export async function getMovieDetails(req, res) {
    const { id } = req.params;

    try {
        // Fetch movie details from TMDB API
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        console.log(`Fetched details for movie ID: ${id}`);

        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error(`Error in getMovieDetails for movie ID: ${id}`, error.message);

        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Controller to get similar movies based on a movie ID
export async function getSimilarMovies(req, res) {
    const { id } = req.params; // Extract movie ID from request parameters

    try {
        // Fetch similar movies from TMDB API
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        console.log(`Fetched ${data.results?.length} similar movies for movie ID: ${id}`);

        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.error(`Error in getSimilarMovies for movie ID: ${id}`, error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Controller to get movies by category (e.g., popular, top-rated, upcoming)
export async function getMoviesByCategory(req, res) {
    const { category } = req.params;

    try {
        // Fetch movies in the specified category from TMDB API
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        console.log(`Fetched ${data.results?.length} movies in category: ${category}`);

        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(`Error in getMoviesByCategory for category: ${category}`, error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
