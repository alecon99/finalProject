import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import { ProductsContext } from './context/ProductsContext';
import { PageSizeContext } from './context/PageSizeContext';

import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ProductDetailPage from './pages/ProductDetailPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <PageSizeContext>
      <ProductsContext>
        <BrowserRouter>
          <Routes>
            <Route
              exact path='/'
              element={<Homepage />}
            />
            <Route
              path='/detail/:productId'
              element={<ProductDetailPage />}
            />
            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route
              path='/registration'
              element={<RegistrationPage />}
            />
            <Route element={<ProtectedRoutes/>}>
              {/* rotte protette */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductsContext>
    </PageSizeContext>
  );
}

export default App;
