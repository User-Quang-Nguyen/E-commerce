import { useState, useEffect } from 'react';
import { verifyToken } from './functions/handleToken';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUserById } from './api/user';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import ProductPreview from './pages/ProductPreview';
import HomeHeader from './components/Header';
import HomeFooter from './components/Footer';
import Cart from './pages/Cart';
import Profile from './pages/Profile/displayInfo';

function App() {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    id: '',
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await verifyToken();
        const info = await getUserById(result.result.userID);
        setAuthState({
          isLoggedIn: result.message,
          id: result.result.userID,
          name: info[0].last_name,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => { }, [authState])
  return (
    <Router>
      <div className="App">
        <HomeHeader authState={authState} />
        <Routes>
          <Route path="/" element={<HomePage authState={authState} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products/:id" element={<ProductPreview authState={authState} />} />
          <Route path="/cart" element={<Cart authState={authState} />} />
          <Route path='/profile' element={<Profile authState={authState} />} />
        </Routes>
        <HomeFooter />
      </div>
    </Router>
  );
}

export default App;
