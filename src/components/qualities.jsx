import React from 'react';

const Qualities = ({color, name, _id}) => {

  return (
    <span
      className={`badge bg-${color} m-1`}
      key={_id}
    >
      {name}
    </span>
  );
}

export default Qualities;