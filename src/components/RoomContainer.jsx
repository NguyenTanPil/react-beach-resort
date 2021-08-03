import React, { useContext } from 'react';
import RoomsFilter from './RoomFilter';
import RoomsList from './RoomList';
import { RoomContext } from '../context';
import Loading from './Loading';

export default function RoomContainer() {
  const { loading, storedRooms, rooms } = useContext(RoomContext);
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={storedRooms} />
    </div>
  );
}
