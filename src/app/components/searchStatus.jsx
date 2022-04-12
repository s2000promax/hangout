import React from 'react';
import { getEndOfWord } from '../utils/utils';
import PropTypes from 'prop-types';

const SearchStatus = ({ count }) =>
  !!count
    ? <span
      className='badge btn-primary m-2 fs-5'
      >
        {count} человек{getEndOfWord(count, 'a')} тусан{!getEndOfWord(count, 'end') ? 'ет' : 'ут'} с тобой сегодня
      </span>
    : <span
      className='badge btn-danger m-2 fs-5'
      >
        Никто с тобой не тусанет
      </span>;

SearchStatus.propTypes = {
  count: PropTypes.number
};

export default SearchStatus;
