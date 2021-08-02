import React, { useContext } from 'react';
import { RoomContext } from '../context';

FeatureRooms.propTypes = {};

function FeatureRooms(props) {
  const { rooms, featureRooms, storedRooms, loading } = useContext(RoomContext);
  console.log(rooms, featureRooms, storedRooms, loading);

  return <div></div>;
}

export default FeatureRooms;
