import React from 'react';
import Body from './HomeBody';

const HomePage = ({ authState }) => {
  return (
    <div>
      <Body authState={authState} />
    </div>
  );
}

export default HomePage;
