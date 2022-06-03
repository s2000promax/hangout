import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import api from '../../../../api';
import Qualities from '../../../ui/qualities/qualities';
// import Loader from '../../../ui/loader';
import CommentsList from '../../comments/commentsList';
import { useUser } from '../../../../hooks/useUsers';

const UserPage = ({ id }) => {
  const history = useHistory();
  // const [user, setUser] = useState({});
  let user = null;
  const [sortBy, setSortBy] = useState({ path: 'created_at', order: 'asc' });
  const { getUserById } = useUser();

  // useEffect(() => {
  //   api.users.getById(id).then((userInfo) => {
  //     if (!userInfo) {
  //       history.push('/404');
  //     } else if (Array.isArray(userInfo)) {
  //       setUser({}); // Заглушка на случай, если придет Массив
  //     } else {
  //       setUser(userInfo);
  //     }
  //   });
  // }, []);

  if (!getUserById(id)) {
    history.push('/404');
  } else {
    user = getUserById(id);
  }

  const handleReturnToUsersPage = () => {
    history.push(`${id}/edit`);
  };

  const handleSortASC = (event) => {
    const { target } = event;
    if (!target.classList.contains('text-primary')) {
      setSortBy({
        path: 'created_at',
        order: 'asc'
      });
      target.classList.replace('bi-caret-down', 'bi-caret-down-fill');
      target.classList.replace('text-secondary', 'text-primary');
      target.parentNode.children[1].classList.replace('bi-caret-up-fill', 'bi-caret-up');
      target.parentNode.children[1].classList.replace('text-primary', 'text-secondary');
    }
    ;
  };
  const handleSortDESC = (event) => {
    const { target } = event;
    if (!target.classList.contains('text-primary')) {
      setSortBy({
        path: 'created_at',
        order: 'desc'
      });
      target.classList.replace('bi-caret-up', 'bi-caret-up-fill');
      target.classList.replace('text-secondary', 'text-primary');
      target.parentNode.children[0].classList.replace('bi-caret-down-fill', 'bi-caret-down');
      target.parentNode.children[0].classList.replace('text-primary', 'text-secondary');
    }
    ;
  };
  return (
    <>
      {<div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={() => {
                      handleReturnToUsersPage();
                    }}
                  >
                    <i className="bi bi-gear"></i>
                  </button>
                  <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                      src={`https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                      )
                        .toString(36)
                        .substring(7)}.svg`}
                      className="rounded-circle shadow-1-strong me-3"
                      alt="avatar"
                      width="65"
                      height="65"
                    />
                    <div className="mt-3">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">{user.profession.name}</p>
                      <div className="text-muted">
                        <i className="bi bi-caret-down-fill text-primary" role="button" onClick={handleSortASC}></i>
                        <i className="bi bi-caret-up text-secondary" role="button" onClick={handleSortDESC}></i>
                        <span className="ms-2">{user.rate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Qualities</span>
                  </h5>
                  <p className="card-text">
                    {user.qualities
                      .map(q => (
                        <Qualities
                          key={q}
                          id={q}
                        />
                      ))}
                  </p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Completed meetings</span>
                  </h5>

                  <h1 className="display-1">{user.completedMeetings}</h1>
                </div>
              </div>

            </div>

            <div className="col-md-8">
              <CommentsList userId={id} sortBy={sortBy}/>
            </div>

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
