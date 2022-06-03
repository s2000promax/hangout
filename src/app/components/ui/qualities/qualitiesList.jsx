import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';

const QualitiesList = ({ ids }) => {
  return (
    <>
      {ids.map((id) => (
          <Qualities
            key={id}
            id={id}
          />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  ids: PropTypes.array
};

export default QualitiesList;
