import React from 'react';

Hero.propTypes = {};

function Hero({ children, hero }) {
  return <header className={hero}>{children}</header>;
}

export default Hero;
