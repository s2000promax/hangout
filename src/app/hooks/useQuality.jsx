import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import qualityService from '../services/quality.service';
import Loader from '../components/ui/loader';

const QualityContext = React.createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  async function getQualitiesList() {
    try {
      const { content } = await qualityService.fetchAll();
      setQualities(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function getQuality(id) {
    return qualities.find(qual => qual._id === id);
  };

  function errorCatcher(error) {
    console.log('###-Error:', error);
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <>
      <QualityContext.Provider
        value={{ isLoading, qualities, getQuality }}
      >
        {!isLoading ? children : <Loader type={'1'}/>}
      </QualityContext.Provider>
    </>
  );
};

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
