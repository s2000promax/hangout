import React, { useEffect, useState } from 'react';
import Pagination from '../../pagination';
import { paginate } from '../../../../utils/paginate';
import api from '../../../../api';
import GroupList from '../../groupList';
import SearchStatus from '../../../ui/searchStatus';
import UsersTable from '../../../ui/usersTable';
import _ from 'lodash';
import Loader from '../../../ui/loader';
import TextField from '../../form/textField';

const UsersListPage = () => {
  const pageSize = 6;

  const [isInitialisation, setIsInitialisation] = useState(false); // Заглушка для Loader
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState({});
  const [selectedProfs, setSelectedProfs] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const [users, setUsers] = useState([]);

  const [searchData, setSearchData] = useState({ search: '' });

  useEffect(() => {
    api.users.fetchAll().then((dataOfUsers) => {
      setUsers(dataOfUsers);
      setIsInitialisation(true);
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll()
      .then(dataOfProfessions => setProfession(dataOfProfessions));
  }, [isInitialisation]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfs]);

  const handleSearchChange = (target) => {
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
    if (!!searchData.search) {
      setSearchData({ search: '' });
    } else {
      setSelectedProfs();
    }
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
      {!professions
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

export default UsersListPage;
