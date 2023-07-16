import { useState, useEffect } from 'react';
import { sendToken } from './functions/extension';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import Product from './pages/CardDetail';
import Cart from './pages/Cart';

function App() {
  const [loggedIn, setLoggedIn] = useState({
    message: false,
    id: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await sendToken();
        setLoggedIn({
          message: result.message,
          id: result.result.userID,
          email: result.result.userEmail,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => { }, [loggedIn])
  console.log(loggedIn);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={loggedIn} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Product isLoggedIn={loggedIn} />} />
          <Route path='/cart' element={<Cart isLoggedIn={loggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
