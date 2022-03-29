import React from 'react';

const Bookmark = ({status, ...rest}) => {
  const {onToggleBookmark, userId} = rest;

  return (
    <i
      className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}
      onClick={() => onToggleBookmark(userId)}
    >
    </i>
  );
}

export default Bookmark;
