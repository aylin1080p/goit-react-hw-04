import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Accept-Version': 'v1',
  },
});

export async function fetchImages(query, page) {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error('Missing Unsplash access key. Add VITE_UNSPLASH_ACCESS_KEY to your .env file.');
  }

  const response = await unsplashApi.get('/search/photos', {
    params: {
      client_id: accessKey,
      query,
      page,
      per_page: 12,
    },
  });

  return response.data;
}
