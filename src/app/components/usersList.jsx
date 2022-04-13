import React, { useEffect, useState } from 'react';
import { tableHeaders } from '../const/const';
import { createHeaders } from '../utils/utils';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from './groupList';
import SearchStatus from './searchStatus';

const UsersList = ({ users, ...rest }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState([]);
  const [selectedProfs, setSelectedProfs] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((dataOfProfessions) => {
      if (Object.prototype.toString.call(dataOfProfessions) === '[object Array]') {
        setProfession(dataOfProfessions);
      } else {
        setProfession([]); // Заглушка на случай, если придет Объект
      }
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProfs]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filteredUsers = selectedProfs
    ? users.filter((user) => user.profession.name === selectedProfs?.name)
    : users;

  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProfs();
  };

  if (!userCrop.length && count > 0) {
    setCurrentPage(prevPage => prevPage - 1);
  }

  const handleProfessionSelect = (item) => {
    setSelectedProfs(item);
  };

  return (
    <>
      {!professions.length
        ? <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
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
        <SearchStatus count={count}/>
        {count > 0
          && <table className="table">
            <thead>
            <tr>
              {createHeaders(tableHeaders)}
            </tr>
            </thead>
            <tbody>
            <User
              users={userCrop}
              {...rest}
            />
            </tbody>
          </table>}
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
