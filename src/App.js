import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProductsContext } from './context/ProductsContext';
import { PageSizeContext } from './context/PageSizeContext';

import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ProductDetailPage from './pages/ProductDetailPage';
import RegistrationPage from './pages/RegistrationPage';
import { CartContext } from './context/CartContext';
import { AdminContext } from './context/AdminContext';
import SuccessLogin from './pages/SuccessLogin';
import DisconnectPage from './pages/DisconnectPage';
import ManageProductPage from './pages/ManageProductPage';
import { ModalModifyContex } from './context/ModalModifyProductContext';
import { SelectedProductContex } from './context/SelectedProduct';

function App() {
  return (
    <PageSizeContext>
      <AdminContext>
        <ProductsContext>
          <CartContext>
            <ModalModifyContex>
              <SelectedProductContex>
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
                    <Route
                      path='/disconnect'
                      element={<DisconnectPage />}
                    />
                    <Route element={<ProtectedRoutes />}>
                      {/* rotte protette */}
                      <Route
                        path='/successLogin'
                        element={<SuccessLogin />}
                      />
                      <Route
                        path='/addProduct'
                        element={<ManageProductPage />}
                      />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </SelectedProductContex>
            </ModalModifyContex>
          </CartContext>
        </ProductsContext>
      </AdminContext>
    </PageSizeContext>
  );
}

export default App;
