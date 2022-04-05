import React, { useState } from 'react';
import { tableHeaders } from '../const/const';
import { createHeaders } from '../utils/utils';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';

const UsersList = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const userCrop = paginate(users, currentPage, pageSize);
  if (!userCrop.length) {
    setCurrentPage(prevPage => prevPage - 1);
  }
  return (
    <>
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
