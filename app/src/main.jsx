import { createRoot } from 'react-dom/client';
import init from './app.jsx';

const app = async () => {
  const root = createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
