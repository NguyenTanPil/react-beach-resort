import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeatureRooms from '../components/FeatureRooms';

Hero.defaultProps = {
  hero: 'defaultHero',
};

const Home = () => {
  return (
    <>
      <Hero>
        <Banner
          title="luxurious rooms"
          subtitle="deluxe rooms starting at $229"
        >
          <Link to="/rooms" className="btn-primary">
            our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeatureRooms />
    </>
  );
};
export default Home;
