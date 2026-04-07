import axios from 'axios';

const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Accept-Version': 'v1',
  },
});

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api',
});

function normalizePixabayImage(image) {
  return {
    id: image.id,
    alt_description: image.tags,
    description: image.tags,
    urls: {
      small: image.webformatURL,
      regular: image.largeImageURL,
    },
    likes: image.likes,
    user: {
      name: image.user,
      location: 'Unknown',
    },
    links: {
      html: image.pageURL,
    },
  };
}

export async function fetchImages(query, page) {
  const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const pixabayAccessKey = import.meta.env.VITE_PIXABAY_KEY;

  if (unsplashAccessKey) {
    const response = await unsplashApi.get('/search/photos', {
      params: {
        client_id: unsplashAccessKey,
        query,
        page,
        per_page: 12,
      },
    });

    return response.data;
  }

  if (!pixabayAccessKey) {
    throw new Error(
      'Missing image API key. Add VITE_UNSPLASH_ACCESS_KEY or VITE_PIXABAY_KEY to your .env file.',
    );
  }

  const response = await pixabayApi.get('', {
    params: {
      key: pixabayAccessKey,
      q: query,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return {
    results: response.data.hits.map(normalizePixabayImage),
    total_pages: Math.ceil(response.data.totalHits / 12),
  };
}
