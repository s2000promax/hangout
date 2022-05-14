import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../../../api';
import avatar from '../../../../../assets/avatar.jpg';
import Qualities from '../../../ui/qualities/qualities';
import Loader from '../../../ui/loader';

const UserPage = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    api.users.getById(id).then((userInfo) => {
      if (!userInfo) {
        history.push('/404');
      } else if (Array.isArray(userInfo)) {
        setUser({}); // Заглушка на случай, если придет Массив
      } else {
        setUser(userInfo);
      }
    });
  }, []);

  const handleReturnToUsersPage = () => {
    history.push(`${id}/edit`);
  };
  return (
    <>
      {!user?._id
        ? <Loader/>
        : <div className='card' style={{ width: '18rem' }}>
          <img src={avatar} className='card-img-top' alt='avatar'/>
          <div className='card-body'>
            <h5 className='card-title'>{user.name}</h5>
            <h6 className='card-title'>Профессия: {user.profession.name} </h6>
          </div>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
              Качества:
              {user.qualities
                .map(q => (
                  <Qualities
                    color={q.color}
                    _id={q._id}
                    name={q.name}
                    key={q._id}
                  />
                ))}
            </li>
            <li className='list-group-item'>Встретился раз: {user.completedMeetings}</li>
            <li className='list-group-item'>Оценка: {user.rate}</li>
          </ul>
          <div className='card-body'>
            <button onClick={() => {
              handleReturnToUsersPage();
            }}>
              Изменить
            </button>
          </div>
        </div>
      }
    </>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
