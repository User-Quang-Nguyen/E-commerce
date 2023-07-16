import React from 'react';
import Header from './Header';
import Body from './HomeBody';
import Footer from './HomeFooter';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Body isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
}

export default HomePage;
