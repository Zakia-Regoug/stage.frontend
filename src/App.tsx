import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './layout/header';
import HomePage from './pages/home';
import ProductItem from './components/productItem';

function App() {
  return (
    <BrowserRouter>
      <div className=" text-white">
        <Header />
        <main className="mx-auto w-full ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/produit/:produitId" element={<ProductItem/>} />
          </Routes>
          <Toaster position="bottom-right" />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
