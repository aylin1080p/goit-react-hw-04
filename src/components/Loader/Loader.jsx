import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <ThreeDots
        visible
        height="48"
        width="48"
        color="#0b7a75"
        radius="8"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

export default Loader;
