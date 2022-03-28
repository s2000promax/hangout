import React from 'react';
import {tableHeaders} from '../const/const';
import {createHeaders} from '../utils/utils';
import User from './user';

const UsersList = ({users, ...rest}) => {

  return (<table className="table">
      <thead>
      <tr>
        {createHeaders(tableHeaders)}
      </tr>
      </thead>
      <tbody>
        <User
          users={users}
          {...rest}
        />
      </tbody>
    </table>
  );
}

export default UsersList;