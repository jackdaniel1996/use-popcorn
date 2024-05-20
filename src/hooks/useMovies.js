import { useState, useEffect } from "react";
import { KEY } from "../App";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setIsloading(true);
                    setError("");

                    const res = await fetch(
                        `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                        { signal: controller.signal }
                    );

                    if (!res.ok) {
                        throw new Error("Something went wrong while fetching.");
                    }

                    const data = await res.json();
                    if (data.Response === "False") {
                        throw new Error("Movie not found.");
                    }

                    setMovies(data.Search);
                    setError("");
                } catch (err) {
                    console.log(err.message);
                    if (err.name !== "AbortError") {
                        setError(err.message);
                    }
                } finally {
                    setIsloading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );
    return { movies, isLoading, error };
}
