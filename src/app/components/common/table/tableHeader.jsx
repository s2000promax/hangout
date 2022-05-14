import React from 'react';
import PropTypes from 'prop-types';
import Caret from '../../ui/caret';

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        path: selectedSort.path,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope='col'
          >
            {columns[column].name}
            {columns[column].path === selectedSort.path && <Caret type={selectedSort.order}/>}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
