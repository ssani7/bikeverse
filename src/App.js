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

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/shop' element={<AllProducts />}></Route>
        <Route path='/part/:id' element={
          <RequireAuth>
            <ProductDetails />
          </RequireAuth>}>
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
