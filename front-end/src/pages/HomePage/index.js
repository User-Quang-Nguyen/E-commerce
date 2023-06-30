import React from 'react';
import Header from './HomeHeader';
import Body from './HomeBody';
import Footer from './HomeFooter';
import { useState, useEffect } from 'react';
import { sendToken } from '../../functions/function';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState({
    message: false,
    id: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await sendToken();
      console.log(result);
      // setLoggedIn(result.message);
      setLoggedIn({
        message: result.message,
        id: result.result.userID,
        email: result.result.userEmail,
      });

    };
    try {
      fetchData();
    }
    catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <Header isLoggedIn={loggedIn} />
      <Body isLoggedIn={loggedIn} />
      <Footer />
    </div>
  );
}

export default HomePage;
