import React from 'react';
import PropTypes from 'prop-types';

const Caret = ({ type }) => {
  switch (type) {
    case 'asc':
      return (
        <i className='bi bi-caret-up-fill'></i>
      );
    case 'desc':
      return (
        <i className='bi bi-caret-down-fill'></i>
      );
    default:
      return (
        <>
        </>
      );
  }
};

Caret.propTypes = {
  type: PropTypes.string
};

export default Caret;
