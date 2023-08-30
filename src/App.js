import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { ProductsContext } from './context/ProductsContext';

import Homepage from './pages/Homepage';

function App() {
  return (
    <ProductsContext>
      <BrowserRouter>
        <Routes>
          <Route
            exact path='/'
            element={<Homepage />}
          />
        </Routes>
      </BrowserRouter>
    </ProductsContext>
  );
}

export default App;
