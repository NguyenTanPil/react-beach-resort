import React, { useEffect, useState } from 'react';
import items from './data';

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [storedRooms, setStoredRooms] = useState([]);
  const [featureRooms, setFeatureRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // functions
  const formatData = (items) => {
    return items.map((item) => {
      const id = item.sys.id;
      const images = item.fields.images.map((image) => image.fields.file.url);

      const room = { ...item.fields, id, images };
      return room;
    });
  };

  // get data
  useEffect(() => {
    // setRooms(formatData(items));
    const rooms = formatData(items);
    const featureRooms = rooms.filter((room) => room.feature === true);
    setRooms(rooms);
    setFeatureRooms(featureRooms);
    setStoredRooms(rooms);
    setLoading(false);
  }, []);

  // values
  const values = {
    rooms,
    featureRooms,
    storedRooms,
    loading,
  };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
};

export { RoomContext, RoomProvider };
