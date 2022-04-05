import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = ({ status, ...rest }) => {
  const { onToggleBookmark, userId } = rest;

  return (
    <i
      className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
      onClick={() => onToggleBookmark(userId)}
    >
    </i>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool
};

export default Bookmark;
