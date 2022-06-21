import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((id) => (
          <Qualities
            key={id}
            id={id}
          />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
