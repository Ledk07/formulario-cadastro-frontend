import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import ListaCadastros from './ListaCadastro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/cadastros" element={<ListaCadastros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;