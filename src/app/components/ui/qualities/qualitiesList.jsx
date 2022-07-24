import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities';
import Loader from '../loader';

const QualitiesList = ({ qualities }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());

  if (isLoading) {
    return <Loader type='1'/>;
  }

  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);
  return (
    <>
      {qualitiesList.map((qual) => (
        <Qualities
          key={qual._id}
          {...qual}
        />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
