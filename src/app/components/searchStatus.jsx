import React from 'react';
import { getEndOfWord } from '../utils/utils';
import PropTypes from 'prop-types';

const SearchStatus = ({ count, users }) => {
  if (!!count && !!users.length) {
    return (
      <span
        className='badge btn-primary m-2 fs-5'
      >
        {count} человек{getEndOfWord(count, 'a')} тусан{!getEndOfWord(count, 'end') ? 'ет' : 'ут'} с тобой сегодня
      </span>
    );
  } else if (!count && !!users.length) {
    return (
      <span
        className='badge btn-danger m-2 fs-5'
      >
      В этой категории нет подходящих вариантов для тусовки
    </span>
    );
  }
  return (
    <span
      className='badge btn-danger m-2 fs-5'
    >
      Никто с тобой не тусанет
    </span>
  );
};

SearchStatus.propTypes = {
  count: PropTypes.number,
  users: PropTypes.array
};

export default SearchStatus;
