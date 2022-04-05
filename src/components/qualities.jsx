import React from 'react';
import PropTypes from 'prop-types';

const Qualities = ({ color, name, _id }) => {
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
  color: PropTypes.string,
  name: PropTypes.string,
  _id: PropTypes.string
};

export default Qualities;
