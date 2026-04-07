import Modal from 'react-modal';
import css from './ImageModal.module.css';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(8, 18, 27, 0.8)',
    zIndex: 20,
  },
  content: {
    inset: '50% auto auto 50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '960px',
    width: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 48px)',
    padding: 0,
    border: 'none',
    borderRadius: '28px',
    overflow: 'hidden',
    backgroundColor: '#10252d',
  },
};

function ImageModal({ image, isOpen, onClose }) {
  if (!image) {
    return null;
  }

  const description = image.description || image.alt_description || 'Unsplash image';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Selected image"
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      <div className={css.content}>
        <img className={css.image} src={image.urls.regular} alt={description} />
        <div className={css.details}>
          <h2 className={css.title}>{description}</h2>
          <p className={css.text}>
            Author: <span>{image.user.name}</span>
          </p>
          <p className={css.text}>
            Likes: <span>{image.likes}</span>
          </p>
          <p className={css.text}>
            Location: <span>{image.user.location || 'Unknown'}</span>
          </p>
          <a
            className={css.link}
            href={image.links.html}
            target="_blank"
            rel="noreferrer noopener"
          >
            View on Unsplash
          </a>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;
