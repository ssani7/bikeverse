import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Header from './Pages/Shared/Header';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Reviews from './Pages/Reviews/Reviews';
import AllProducts from './Pages/Products/AllProducts';
import CategoryProducts from './Pages/Products/CategoryProducts';
import NotFound from './Pages/Shared/NotFound';
import ProductDetails from './Pages/Products/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './Pages/Login/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserOrders from './Pages/Dashboard/User/UserOrders';
import UserProfile from './Pages/Dashboard/UserProfile';
import RequireAdmin from './Pages/Login/RequireAdmin';
import AddProduct from './Pages/Dashboard/Admin/AddProduct';
import ManageAllOrders from './Pages/Dashboard/Admin/ManageAllOrders';
import ManageProducts from './Pages/Dashboard/Admin/ManageProducts';
import ManageUsers from './Pages/Dashboard/Admin/ManageUsers';
import AddReview from './Pages/Dashboard/User/AddReview';
import Portfolio from './Pages/Portfolio';

function App() {
  return (
    <div data-theme="business" className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/shop' element={<AllProducts />}></Route>
        <Route path='/portfolio' element={<Portfolio />}></Route>
        <Route path='/part/:id' element={
          <RequireAuth>
            <ProductDetails />
          </RequireAuth>}>
        </Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<UserProfile />}></Route>
          <Route path='addReview' element={<AddReview />}></Route>
          <Route path='orders' element={<UserOrders />}></Route>

          <Route path='addParts' element={<RequireAdmin><AddProduct /></RequireAdmin>}></Route>
          <Route path='manageOrder' element={<RequireAdmin><ManageAllOrders /></RequireAdmin>}></Route>
          <Route path='manegeProduct' element={<RequireAdmin><ManageProducts /></RequireAdmin>}></Route>
          <Route path='manageUser' element={<RequireAdmin><ManageUsers /></RequireAdmin>}></Route>
        </Route>
        <Route path='/shop/:category' element={<CategoryProducts />}></Route>
        <Route path='/reviews/:length' element={<Reviews />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <ToastContainer
        pauseOnFocusLoss={false} />
    </div>
  );
}

export default App;
