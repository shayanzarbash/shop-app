import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/Loding";
import { IRootState } from './redux/app/store.ts';
import { AppDispatch } from './redux/app/store.ts';
import Products from "./components/products/Products";
import Shopping from "./components/shopping/Shopping";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./redux/features/products/productsSlice.ts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch])

  const loading = useSelector<IRootState, boolean>(state => state.productsReducer.loading);

  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={loading ? <Loading /> : <Products />} />
        <Route path="/shoppingCart" element={<Shopping />} />
      </Routes>
      <Footer />
    </Router>
  )
}

