import css from './ImageCard.module.css';

function ImageCard({ image, onSelect }) {
  const imageAlt = image.alt_description || image.description || 'Unsplash image';

  return (
    <div className={css.card}>
      <button className={css.button} type="button" onClick={() => onSelect(image)}>
        <img className={css.image} src={image.urls.small} alt={imageAlt} />
      </button>
      <div className={css.meta}>
        <p className={css.author}>by {image.user.name}</p>
        <p className={css.likes}>{image.likes} likes</p>
      </div>
    </div>
  );
}

export default ImageCard;
