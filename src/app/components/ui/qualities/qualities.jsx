import React from 'react';
import PropTypes from 'prop-types';
import { useQuality } from '../../../hooks/useQuality';

const Qualities = ({ id }) => {
  const { getQuality } = useQuality();
  console.log(getQuality(id));
  const { name, color, _id } = getQuality(id);
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
  id: PropTypes.string.isRequired
};

export default Qualities;
