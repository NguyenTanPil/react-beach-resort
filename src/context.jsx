import React, { useEffect, useState } from 'react';
import items from './data';

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [storedRooms, setStoredRooms] = useState([]);
  const [featureRooms, setFeatureRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('all');
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  // functions
  const formatData = (items) => {
    const data = items.map((item) => {
      const id = item.sys.id;
      const images = item.fields.images.map((image) => image.fields.file.url);

      const room = { ...item.fields, id, images };
      return room;
    });
    return data;
  };
  const getRoom = (slug) => {
    return rooms.find((room) => room.slug === slug);
  };
  const handleChange = (e) => {
    const element = e.target;
    const value = e.type === 'checkbox' ? element.checked : element.value;
    const name = e.target.name;
    if (name === 'type') {
      setType(value);
    } else if (name === 'capacity') {
      setCapacity(value);
    } else if (name === 'price') {
      setPrice(value);
    } else if (name === 'minSize') {
      setMinSize(value);
    } else if (name === 'maxSize') {
      setMaxSize(value);
    } else if (name === 'breakfast') {
      setBreakfast(!breakfast);
    } else if (name === 'pets') {
      setPets(!pets);
    }
  };
  // filter change
  useEffect(() => {
    let tempRooms = [...rooms];

    // filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter((room) => {
        return room.type === type;
      });
    }

    // filter by capacity
    const people = parseInt(capacity);
    if (people !== 1) {
      tempRooms = tempRooms.filter((room) => {
        return room.capacity === people;
      });
    }

    // filter by price
    const tempPrice = parseInt(price);
    if (tempPrice !== 0) {
      tempRooms = tempRooms.filter((room) => {
        return room.price <= tempPrice;
      });
    }

    // filter by size
    tempRooms = tempRooms.filter((room) => {
      return room.size >= parseInt(minSize) && room.size <= parseInt(maxSize);
    });

    // filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => {
        return room.breakfast === true;
      });
    }

    // filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => {
        return room.pets === true;
      });
    }

    setStoredRooms(tempRooms);
  }, [type, capacity, price, breakfast, minSize, maxSize, pets]);

  // get data
  useEffect(() => {
    // setRooms(formatData(items));
    const rooms = formatData(items);
    const featureRooms = rooms.filter((room) => room.feature === true);
    const maxPrice = Math.max(...rooms.map((item) => item.price));
    const maxSize = Math.max(...rooms.map((item) => item.size));
    setRooms(rooms);
    setFeatureRooms(featureRooms);
    setStoredRooms(rooms);
    setLoading(false);
    setMaxSize(maxSize);
    setMaxPrice(maxPrice);
  }, []);

  // values
  const values = {
    rooms,
    featureRooms,
    storedRooms,
    loading,
    getRoom,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
    handleChange,
  };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
};

export { RoomContext, RoomProvider };
