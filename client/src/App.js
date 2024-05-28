import React from 'react'
import { Navbar } from './components/Navbar'
import { Home } from './components/MainPage/Home'
import { About } from './components/About'
import { Contact } from './components/Contact'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Products } from './components/products'
import { ErrorPage } from './components/common/ErrorPage'
import { Login } from './components/common/Login'
import { ProductProvider } from './components/common/api/provider'
import { Dashboard } from './components/admin/dashboard'
import { AddProduct } from './components/admin/addProduct'
import { PrivateRoute } from './components/admin/PrivateRoute'
import { Register } from './components/common/Register'
import { Cart } from './components/cart'
import { Product } from './components/product'
import { Checkout } from './components/checkout'
import { Orderlisting } from './components/admin/orderlisting'
import { CategoryListing } from './components/admin/categoryListing'

const App = () => {
  return (
    <>
      <ProductProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='*' element={<ErrorPage />} />
            <Route
              path="/addproduct"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/orderlisting"
              element={
                <PrivateRoute>
                  <Orderlisting />
                </PrivateRoute>
              }
            />
            <Route
              path="/categoryListing"
              element={
                <PrivateRoute>
                  <CategoryListing />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ProductProvider>
    </>
  )
}

export default App