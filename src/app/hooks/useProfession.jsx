import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import professionService from '../services/profession.service';

const ProfessionContext = React.createContext();

export const useProfessions = () => {
  return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
  const [professions, setProfession] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionsList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getProfessionsList() {
    try {
      const { content } = await professionService.get();
      setProfession(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function getProfession(id) {
    return professions.find(prof => prof._id === id);
  };

  function errorCatcher(error) {
    console.log('###-Error:', error);
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <>
      <ProfessionContext.Provider
        value={{ isLoading, professions, getProfession }}
      >
        {children}
      </ProfessionContext.Provider>
    </>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
