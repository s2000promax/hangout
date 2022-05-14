import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../../api';
import TextField from '../../form/textField';
import SelectField from '../../form/selectField';
import RadioField from '../../form/radioField';
import MultiSelectField from '../../form/multiSelectField';
import { validator } from '../../../../utils/validator';

const EditUserPage = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [isInitialisation, setIsInitialisation] = useState(false); // Для первого заполнения MultiSelectField
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: '',
    qualities: []
  });
  const [qualitiesList, setQualitiesList] = useState([]);
  const [professionsList, setProfessionList] = useState([]);
  const [errors, setErrors] = useState({});

  // useEffect для первого рендеринга, для отображения качеств в MultiSelectField
  useEffect(() => {
    if (!!userData.qualities.length) setIsInitialisation(true);
  }, [userData.qualities]);

  useEffect(() => {
    validate();
  }, [userData]);

  useEffect(() => {
    api.users.getById(userId).then((userInfo) => {
      if (!userInfo) {
        history.push('/404');
      } else {
        const userQualities = userInfo.qualities.map(el => ({
          label: el.name,
          value: el._id,
          color: el.color
        }));
        setUserData({
          name: userInfo.name,
          email: userInfo.email,
          profession: userInfo.profession._id,
          sex: userInfo.sex,
          qualities: userQualities
        });
      }
    });
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessionList(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualitiesList(qualitiesList);
    });
  }, []);

  const isValid = !Object.keys(errors).length;

  const getProfessionById = (id) => {
    for (const prof of professionsList) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualitiesList) {
        if (elem.value === qualitiesList[quality].value) {
          qualitiesArray.push({
            _id: qualitiesList[quality].value,
            name: qualitiesList[quality].label,
            color: qualitiesList[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

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
    }
  };

  const validate = () => {
    const errors = validator(userData, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleChange = (target) => {
    setUserData(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { profession, qualities } = userData;
    api.users.update(userId, {
      ...userData,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    }).then(data => console.log('data', data));

    history.push(`/users/${userId}`);
  };

  return (
    <>
      {isInitialisation && (
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
                  error={''/* errors.profession */}
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
