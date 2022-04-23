import React, { useEffect, useState } from 'react';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import api from '../api';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';
import Loader from './loader';

const UsersList = () => {
  const pageSize = 6;

  const [isInitialisation, setIsInitialisation] = useState(false); // Заглушка для Loader
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProfs, setSelectedProfs] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const [users, setUsers] = useState([]);

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

  const filteredUsers = selectedProfs
    ? users.filter((user) =>
      JSON.stringify(user.profession) === JSON.stringify(selectedProfs))
    : users;

  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProfs();
  };

  if (!userCrop.length && count > 0) {
    setCurrentPage(prevPage => prevPage - 1);
  }

  const handleProfessionSelect = (item) => {
    setSelectedProfs(item);
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
        <SearchStatus {...{ count, users }}/>
        {count > 0
          && <UsersTable
            {...{
              users: userCrop,
              onSort: handleSort,
              selectedSort: sortBy,
              onDeleteUser: handleDelete,
              onToggleBookMark: handleToggleBookmark
            }}
          />
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
