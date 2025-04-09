const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.pexels.com/v1";

let abortController: AbortController | null = null;

export const fetchPhotos = async (
  page: number,
  perPage = 30,
  query?: string
) => {
  if (abortController) {
    abortController.abort(); // cancel previous request
  }

  abortController = new AbortController();

  const url = query?.length
    ? `${BASE_URL}/search?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`
    : `${BASE_URL}/curated?page=${page}&per_page=${perPage}`;

  const res = await fetch(url, {
    signal: abortController.signal,
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage =
      errorBody?.error || errorBody?.message || "Unknown error from Pexels API";
    throw new Error(errorMessage);
  }

  return res.json();
};

export const fetchPhotoById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/photos/${id}`, {
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    const errorMessage =
      errorBody?.error || errorBody?.message || "Unknown error from Pexels API";
    throw new Error(errorMessage);
  }

  return res.json();
};
