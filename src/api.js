const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = "https://www.omdbapi.com/";

async function fetchPage(title, page, signal) {
  const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}&page=${page}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const data = await response.json();
  if (data.Response === "False") {
    return [];
  }
  return data.Search ?? [];
}

export async function searchMovies(title, signal, count = 16) {
  const pages = Math.ceil(count / 10);
  const results = await Promise.all(
    Array.from({ length: pages }, (_, i) => fetchPage(title, i + 1, signal))
  );
  return results.flat().slice(0, count);
}
