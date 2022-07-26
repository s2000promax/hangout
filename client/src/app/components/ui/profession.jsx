import React from 'react';
import Loader from './loader';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());

  const profession = useSelector(getProfessionById(id));
  if (!isLoading) {
    return (
      <>
        <p>{profession.name}</p>
      </>
    );
  } else {
    return <Loader type={'1'}/>;
  }
};
Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
