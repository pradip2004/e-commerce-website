import axios from './axios';
import React, { createContext, useEffect, useState } from 'react';

export const productContext = createContext();

function Context(props) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const { data } = await axios("/products");
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <productContext.Provider value={[product, setProduct]}>
      {props.children}
    </productContext.Provider>
  );
}

export default Context;
