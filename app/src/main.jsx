import { createRoot } from 'react-dom/client';
import init from './app.jsx';

const app = () => {
  console.log('df')
  const root = createRoot(document.getElementById('root'));
  root.render(init());
};

app();
