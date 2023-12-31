import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import AddProduct from './components/product/AddProducts';


function App() {

  return (
    <>
      <Router>
  <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct  />} />

        </Routes>
        </Router>
    </>
  )
}

export default App
