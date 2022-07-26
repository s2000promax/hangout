import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import api from '../../../../api';
import TextField from '../../form/textField';
import SelectField from '../../form/selectField';
import RadioField from '../../form/radioField';
import MultiSelectField from '../../form/multiSelectField';
import { validator } from '../../../../utils/validator';
import { getQualities, getQualitiesLoadingStatus } from '../../../../store/qualities';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessions } from '../../../../store/professions';
import { getCurrentUserData, updateUser } from '../../../../store/users';

const EditUserPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUserData());
  const { userId } = useParams();
  const history = useHistory();
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: '',
    qualities: []
  });
  const [errors, setErrors] = useState({});

  const professionsList = professions.map(profession => ({
    label: profession.name,
    value: profession._id
  }));

  const qualitiesList = qualities.map(quality => ({
    label: quality.name,
    value: quality._id,
    color: quality.color
  }));

  useEffect(() => {
    validate();
  }, [userData]);

  useEffect(() => {
    if (userId !== currentUser._id) {
      history.push('/');
    }
    if (!currentUser) {
      history.push('/404');
    } else {
      setUserData({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: currentUser.qualities.map(el => {
          const quality = qualities.filter(q => q._id === el).shift();
          return {
            label: quality.name,
            value: quality._id,
            color: quality.color
          };
        })
      });
    }
  }, []);

  const isValid = !Object.keys(errors).length;

  const validatorConfig = {
    name: {
      isRequired: { message: 'Name is required' },
      isName: { message: 'Name incorrect' },
      min: { message: 'Name must have 3 symbols more', value: 3 }
    },
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: { message: 'Email incorrect' }
    },
    profession: {
      isRequired: {
        message: 'Profession is required'
      }
    },
    qualities: {
      isRequired: {
        message: 'Qualities is required'
      }
    }
  };

  const validate = () => {
    const errors = validator({}, validatorConfig);
    // const errors = validator(userData, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleChange = (target) => {
    setUserData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }
    dispatch(
      updateUser({
        _id: currentUser._id,
        image: currentUser.image,
        ...userData,
        qualities: userData.qualities.map(quality => quality.value),
        completedMeetings: currentUser.completedMeetings,
        license: currentUser.license,
        rate: currentUser.rate
      })
    );

    /* try {
      await updateAccount({
        _id: currentUser._id,
        image: currentUser.image,
        ...userData,
        qualities: userData.qualities.map(quality => quality.value),
        completedMeetings: currentUser.completedMeetings,
        license: currentUser.license,
        rate: currentUser.rate
      });
      history.push(`/users/${userId}`);
    } catch (error) {
      setErrors(error);
    } */
  };
  return (
    <>
      {currentUser && !qualitiesLoading && (
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 shadow p-4'>
              <h3 className='mb-4'>Update user information</h3>
              <form onSubmit={handleSubmit}>
                <TextField
                  label='Name'
                  type='text'
                  name='name'
                  value={userData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <TextField
                  label='Email'
                  type='text'
                  name='email'
                  value={userData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label='Choose you profession'
                  value={userData.profession}
                  name='profession'
                  onChange={handleChange}
                  defaultOption='Choose...'
                  options={professionsList}
                  error={errors.profession}
                />
                <RadioField
                  options={[
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' },
                    { name: 'Other', value: 'other' }
                  ]}
                  value={userData.sex}
                  name='sex'
                  onChange={handleChange}
                  label='Choose your gender'
                />
                <MultiSelectField
                  options={qualitiesList}
                  name='qualities'
                  defaultValue={userData.qualities}
                  onChange={handleChange}
                  label='Choose your qualities'
                />
                <button
                  className='btn btn-primary w-100 mx-auto'
                  type='submit'
                  disabled={!isValid}
                >Update
                </button>
              </form>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default EditUserPage;
