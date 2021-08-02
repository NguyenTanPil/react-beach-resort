import React from 'react';
import Title from './Title';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';

Services.propTypes = {};

function Services(props) {
  const services = [
    {
      icon: <FaCocktail />,
      title: 'free cocktail',
      info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    },
    {
      icon: <FaHiking />,
      title: 'endless hiking',
      info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    },
    {
      icon: <FaShuttleVan />,
      title: 'free ShuttleVan',
      info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    },
    {
      icon: <FaBeer />,
      title: 'strongest Beer',
      info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
    },
  ];

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map((service, index) => {
          return (
            <article key={index} className="service">
              <span>{service.icon}</span>
              <h6>{service.title}</h6>
              <p>{service.info}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
