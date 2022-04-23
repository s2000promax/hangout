import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ name, color, _id }) => {
  return (
    <span
      className={`badge bg-${color} m-1`}
      key={_id}
    >
        {name}
      </span>
  );
};

Qualities.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired
};

export default Qualities;
