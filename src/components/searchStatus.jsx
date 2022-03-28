import React from 'react';
import {getEndOfWord} from '../utils/utils'

const SearchStatus = ({length}) => !!length
      ? <span className='badge btn-primary m-2 fs-5'>{length} человек{getEndOfWord(length, 'a')} тусанет с тобой сегодня</span>
      : <span className='badge btn-danger m-2 fs-5'>Никто с тобой не тусанет</span>;

export default SearchStatus;