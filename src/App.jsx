import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import SearchBar from './components/SearchBar/SearchBar';
import { fetchImages } from './services/unsplashApi';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [requestToken, setRequestToken] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    let isMounted = true;

    async function getImages() {
      try {
        setIsLoading(true);
        setError(false);

        const data = await fetchImages(query, page);

        if (!isMounted) {
          return;
        }

        setImages(previousImages =>
          page === 1 ? data.results : [...previousImages, ...data.results],
        );
        setTotalPages(data.total_pages);

        if (data.results.length === 0) {
          toast.error('No images were found for your request.');
        }
      } catch {
        if (!isMounted) {
          return;
        }

        setError(true);
        toast.error('Unable to load images right now. Check the access key and try again.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    getImages();

    return () => {
      isMounted = false;
    };
  }, [page, query, requestToken]);

  const handleSearch = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setRequestToken(previousToken => previousToken + 1);
  };

  const handleLoadMore = () => {
    setPage(previousPage => previousPage + 1);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const hasImages = images.length > 0;
  const canLoadMore = hasImages && page < totalPages;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <main className="container">
        {error && !hasImages && (
          <ErrorMessage message="Something went wrong while loading images. Please try again." />
        )}

        {hasImages && <ImageGallery images={images} onSelect={openModal} />}
        {isLoading && <Loader />}

        {canLoadMore && (
          <div className="loadMoreWrapper">
            <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
          </div>
        )}
      </main>

      <ImageModal image={selectedImage} isOpen={selectedImage !== null} onClose={closeModal} />
    </>
  );
}

export default App;
