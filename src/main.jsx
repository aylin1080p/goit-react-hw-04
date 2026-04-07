import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
  </>,
);
