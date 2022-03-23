import React, {useState} from 'react';
import api from '../api';

const wordsRefactor = number => {
  if (!isNaN(number)) {
    number = Math.abs(number); //Возможно в будующем вынесем эту функцию в утилиты. Задел на универсальность
    if (String(number).length <= 1) {
      /*
      2 человека
      3 человека
      4 человека
       */
      if (number >= 2 && number <= 4) {
        return 'а';
      }
    } else {
      const numberToString = String(number).split('');
      const digit = String(number).length >= 3
        ? Number(numberToString.splice(numberToString.length - 2, numberToString.length).join(''))
        : number;
      /*
      22 23 24
      32 33 34
      42 43 44
      52 53 54
      62 63 64
      72 73 74
      82 83 84
      92 93 94
      */
      for (let d = 2; d < 10; d += 1) {
        if (digit == (d + '2') || digit == (d + '3') || digit == (d + '4')) {
          return 'а';
        }
      }
    }
  }
  return null;
}

const createTable = (data, handler) => {
  const tableHeaders = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', ''];

  const createHeaders = headers => headers.map((header, index) => <th scope="col" key={`id-${index}`}>{header}</th>);

  const createQualities = qualities => (
    <>
      {qualities.map(quality =>
        <span
          className={`badge bg-${quality.color} m-1`}
          key={quality._id}
        >
          {quality.name}
        </span>)
      }
    </>
  );

  const addDataToTable = response => (
    response.map(user => (
      <tr key={user._id}>
        <td scope="row">{user.name}</td>
        <td>{createQualities(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{`${user.rate}/5`}</td>
        <td>
          <button className='btn btn-danger' onClick={() => handler(user._id)}>delete</button>
        </td>
      </tr>
    ))
  );

  return (
    <table className="table">
      <thead>
      <tr>
        {createHeaders(tableHeaders)}
      </tr>
      </thead>
      <tbody>
      {addDataToTable(data)}
      </tbody>
    </table>
  )
}

const Users = () => {

  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers(prevState => prevState.filter( user => user._id !== id));
  }

  const renderPhrase = (number) => {
    return !!number
      ? <span className='badge btn-primary m-2 fs-5'>{number} человек{wordsRefactor(number)} тусанет с тобой сегодня</span>
      : <span className='badge btn-danger m-2 fs-5'>Никто с тобой не тусанет</span>;
  }
  return (<React.Fragment>
    <>
      {renderPhrase(users.length)}
    </>
    <>
      {!!users.length && createTable(users, handleDelete)}
    </>
  </React.Fragment>);
}

export default Users;