import css from './ErrorMessage.module.css';

function ErrorMessage({ message }) {
  return <p className={css.message}>{message}</p>;
}

export default ErrorMessage;
