import React, { useEffect, useState } from 'react';
// import items from './data';
import Client from './Contentful';

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  // states
  const [rooms, setRooms] = useState([]);
  const [storedRooms, setStoredRooms] = useState([]);
  const [featureRooms, setFeatureRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

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
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  // get data
  useEffect(() => {
    const getDataContentFul = async () => {
      try {
        const response = await Client.getEntries({
          content_type: 'beachResortRooms',
          order: 'fields.price',
        });

        const rooms = formatData(response.items);
        const featureRooms = rooms.filter((room) => room.feature === true);
        const maxPrice = Math.max(...rooms.map((item) => item.price));
        const maxSize = Math.max(...rooms.map((item) => item.size));
        setRooms(rooms);
        setFeatureRooms(featureRooms);
        setStoredRooms(rooms);
        setLoading(false);
        setFilter((filter) => {
          return { ...filter, maxSize: maxSize, maxPrice: maxPrice };
        });
      } catch (error) {
        console.log(error);
      }
    };
    getDataContentFul();
  }, []);

  // filter change
  useEffect(() => {
    let tempRooms = [...rooms];

    // filter by type
    if (filter.type !== 'all') {
      tempRooms = tempRooms.filter((room) => {
        return room.type === filter.type;
      });
    }

    // filter by capacity
    const people = parseInt(filter.capacity);
    if (people !== 1) {
      tempRooms = tempRooms.filter((room) => {
        return room.capacity === people;
      });
    }

    // filter by price
    const tempPrice = parseInt(filter.price);
    if (tempPrice !== 0) {
      tempRooms = tempRooms.filter((room) => {
        return room.price <= tempPrice;
      });
    }

    // filter by size
    tempRooms = tempRooms.filter((room) => {
      return (
        room.size >= parseInt(filter.minSize) &&
        room.size <= parseInt(filter.maxSize)
      );
    });

    // filter by breakfast
    if (filter.breakfast) {
      tempRooms = tempRooms.filter((room) => {
        return room.breakfast === true;
      });
    }

    // filter by pets
    if (filter.pets) {
      tempRooms = tempRooms.filter((room) => {
        return room.pets === true;
      });
    }

    setStoredRooms(tempRooms);
  }, [filter, rooms]);

  // values
  const values = {
    rooms,
    featureRooms,
    storedRooms,
    loading,
    getRoom,
    filter,
    handleChange,
  };

  return <RoomContext.Provider value={values}>{children}</RoomContext.Provider>;
};

export { RoomContext, RoomProvider };
