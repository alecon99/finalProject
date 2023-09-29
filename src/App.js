import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ProductsContext } from './context/ProductsContext';
import { PageSizeContext } from './context/PageSizeContext';
import { CartContext } from './context/CartContext';
import { AdminContext } from './context/AdminContext';
import { ModalModifyContex } from './context/ModalModifyProductContext';
import { SelectedProductContex } from './context/SelectedProduct';
import { UsersContext } from './context/UserContext';
import { ShippingCostContext } from './context/ShippingCost';

import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import ProductDetailPage from './pages/ProductDetailPage';
import RegistrationPage from './pages/RegistrationPage';
import SuccessLogin from './pages/SuccessLogin';
import DisconnectPage from './pages/DisconnectPage';
import ManageProductsPage from './pages/ManageProductsPage';
import ManageUsersPage from './pages/ManageUsersPage';
import UserDataPage from './pages/UserDataPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderCompletedPage from './pages/OrderCompletedPage';
import UserOrdersPage from './pages/UserOrdersPage';
import ManageOrdersPage from './pages/ManageOrdersPage';
import NotFoundPage from './pages/NotFoundPage';

import ScrollToTop from './middlewares/ScrollToTop';

function App() {
  return (
    <PageSizeContext>
      <AdminContext>
        <ProductsContext>
          <UsersContext>
            <CartContext>
              <ModalModifyContex>
                <SelectedProductContex>
                  <ShippingCostContext>
                    <BrowserRouter>
                      <ScrollToTop />
                      <Routes>
                        <Route
                          exact path='/'
                          element={<Homepage />}
                        />
                        <Route 
                          path='*' 
                          element={<NotFoundPage />}
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
                          <Route
                            path='/successLogin'
                            element={<SuccessLogin />}
                          />
                          <Route
                            path='/userData'
                            element={<UserDataPage />}
                          />
                          <Route
                            path='/userOrders'
                            element={<UserOrdersPage />}
                          />
                          <Route
                            path='/checkout'
                            element={<CheckoutPage />}
                          />
                          <Route
                            path='/orderCompleted'
                            element={<OrderCompletedPage />}
                          />
                          <Route
                            path='/manageProducts'
                            element={<ManageProductsPage />}
                          />
                          <Route
                            path='/manageOrders'
                            element={<ManageOrdersPage />}
                          />
                          <Route
                            path='/manageUsers'
                            element={<ManageUsersPage />}
                          />
                        </Route>
                      </Routes>
                    </BrowserRouter>
                  </ShippingCostContext>
                </SelectedProductContex>
              </ModalModifyContex>
            </CartContext>
          </UsersContext>
        </ProductsContext>
      </AdminContext>
    </PageSizeContext>
  );
}

export default App;
