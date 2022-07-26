import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ color, name, key }) => {
  return (
    <span
      className={`badge bg-${color} m-1`}
      key={key}
    >
        {name}
      </span>
  );
};

Qualities.propTypes = {
  key: PropTypes.string.isRequired,
  color: PropTypes.string,
  name: PropTypes.string
};

export default Qualities;
