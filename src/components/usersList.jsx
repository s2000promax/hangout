import React, { useEffect, useState } from 'react';
import { tableHeaders } from '../const/const';
import { createHeaders } from '../utils/utils';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from './groupList';

const UsersList = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState(api.professions.fetchAll());
  const [selectedProfs, setSelectedProfs] = useState();

  useEffect(() => {
    console.log('Send request');
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [setSelectedProfs]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const filteredUsers = selectedProfs
    ? users.filter((user) => user.profession === selectedProfs)
    : users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const clearFilter = () => {
    setSelectedProfs();
  };

  if (!userCrop.length) {
    setCurrentPage(prevPage => prevPage - 1);
  }

  const handleProfessionSelect = (item) => {
    setSelectedProfs(item);
  };
  return (
    <>
      {
        !!professions && (
          <div className='d-flex flex-column flex-shrink-0 p-3'>
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
        )}
      <div className='d-flex flex-column'>
        <table className="table">
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
        </table>
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
