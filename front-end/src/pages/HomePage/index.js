import React from 'react';
import Header from './HomeHeader';
import Body from './HomeBody';
import Footer from './HomeFooter';
import { sendToken } from '../../functions/function';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState({
    message: false,
    id: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {

      const result = await sendToken();
      // console.log(result);
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

  // console.log(loggedIn.message);
  return (
    <div>
      <Header isLoggedIn={loggedIn} />
      <Body isLoggedIn={loggedIn} />
      <Footer />
    </div>
  );
}

export default HomePage;
