import React, { useEffect, useState } from 'react';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import api from '../api';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';
import Loader from './loader';
import TextField from './textField';

const UsersList = () => {
  const pageSize = 6;

  const [isInitialisation, setIsInitialisation] = useState(false); // Заглушка для Loader
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProfs, setSelectedProfs] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState({ search: '' });

  useEffect(() => {
    api.users.fetchAll().then((dataOfUsers) => {
      if (Array.isArray(dataOfUsers)) {
        setUsers(dataOfUsers);
        setIsInitialisation(true); // Заглушка под успешную инициализацию
      } else {
        setUsers([]); // Заглушка на случай, если придет Объект
      }
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((dataOfProfessions) => {
      if (Array.isArray(dataOfProfessions)) {
        setProfession(dataOfProfessions);
      } else {
        setProfession([]); // Заглушка на случай, если придет Объект
      }
    });
  }, [isInitialisation]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfs]);

  const handleSearchChange = ({ target }) => {
    const allowSymbolsRegEx = /[^а-яА-Яa-zA-Z0-9\s]+/gi;
    const formatSymbols = target.value.replace(allowSymbolsRegEx, '');
    setSearchData(prevState => ({
      ...prevState,
      [target.name]: formatSymbols
    }));
    if (selectedProfs) {
      clearFilter();
    }
  };

  /*
  useEffect(() => {
    clearFilter();
  }, [searchData]);
   */

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleToggleBookmark = (userId) => {
    setUsers(users.map(user => {
      if (user._id === userId) {
        user.bookmark = !user.bookmark;
      }
      return user;
    }));
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const searchingRegExp = new RegExp(searchData.search, 'gi');
  const filteredUsers = selectedProfs
    ? users.filter((user) =>
      JSON.stringify(user.profession) === JSON.stringify(selectedProfs))
    : !!searchData.search
        ? users.filter((user) => searchingRegExp.test(user.name))
        : users;

  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  if (!userCrop.length && count > 0) {
    setCurrentPage(prevPage => prevPage - 1);
  }

  const clearFilter = () => {
    setSelectedProfs();
    setSearchData({ search: '' });
  };

  const handleProfessionSelect = (item) => {
    setSelectedProfs(item);
    setSearchData({ search: '' });
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  return !isInitialisation
    ? <Loader type={'1'}/>
    : <div className='d-flex'>
      {!professions?.length
        ? <Loader type={'2'}/>
        : <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            selectedItem={selectedProfs}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className='btn btn-secondary mt-2'
            onClick={clearFilter}
          >
            Очистить
          </button>
        </div>
      }
      <div className='d-flex flex-column'>
        <SearchStatus {...{ count, users, isSearching: !!searchData.search }}/>
        <TextField
          label=''
          type='text'
          name='search'
          placeholder='Search...'
          value={searchData.search}
          onChange={handleSearchChange}
        />
        {count > 0
          && <>
            <UsersTable
              {...{
                users: userCrop,
                onSort: handleSort,
                selectedSort: sortBy,
                onDeleteUser: handleDelete,
                onToggleBookMark: handleToggleBookmark
              }}
            />
          </>
        }
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>;
};

export default UsersList;
