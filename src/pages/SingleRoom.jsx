import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Banner from '../components/Banner';
import StyleHero from '../components/StyleHero';
import { RoomContext } from '../context';
import defaultBcg from '../images/room-1.jpeg';

SingleRoom.propTypes = {};

function SingleRoom(props) {
  const slug = props.match.params.slug;
  const { getRoom } = useContext(RoomContext);
  const room = getRoom(slug);
  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found </h3>
        <NavLink to="/rooms" className="btn-primary">
          back to rooms
        </NavLink>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images,
  } = room;
  const [mainImg, ...defaultImg] = images;
  return (
    <>
      <StyleHero img={mainImg || defaultBcg}>
        <Banner title={`${name} room`}>
          <NavLink to="/rooms" className="btn-primary">
            back to rooms
          </NavLink>
        </Banner>
      </StyleHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((image, index) => {
            return <img key={index} src={image} alt={name} />;
          })}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQRT</h6>
            <h6>
              max capacity :{' '}
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? 'pets allowed' : 'pets not allowed'}</h6>
            <h6>{breakfast && 'free breakfast included'}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((extra, index) => {
            return <li key={index}>- {extra}</li>;
          })}
        </ul>
      </section>
    </>
  );
}

export default SingleRoom;
