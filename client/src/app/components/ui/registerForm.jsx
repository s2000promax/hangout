import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useDispatch, useSelector } from 'react-redux';
import { getQualities } from '../../store/qualities';
import { getProfessions } from '../../store/professions';
import { singUp } from '../../store/users';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const professions = useSelector(getProfessions());
  const qualities = useSelector(getQualities());

  const [data, setDate] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    name: '',
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});

  const professionsList = professions.map(professionName => ({
    label: professionName.name,
    value: professionName._id
  }));

  const qualitiesList = qualities.map(quality => ({
    label: quality.name,
    value: quality._id
  }));

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' }, isEmail: { message: 'Email incorrect' }
    },
    name: {
      isRequired: { message: 'Name is required' }, min: { message: 'Password must have 3 symbols more', value: 3 }
    },
    password: {
      isRequired: { message: 'Password is required' },
      isCapitalSymbol: { message: 'Password must have one capital symbol' },
      isContainDigit: { message: 'Password must have one digit' },
      min: { message: 'Password must have 8 symbols more', value: 8 }
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
    },
    license: {
      isRequired: {
        message: 'License must be confirmed'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleChange = (target) => {
    setDate(prevState => ({
      ...prevState, [target.name]: target.value
    }));
  };

  const isValid = !Object.keys(errors).length;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    dispatch(singUp({
      ...data,
      qualities: data.qualities.map(quality => quality.value)
    }));
  };
  return (<>
    <form onSubmit={handleSubmit}>
      <TextField
        label='Email'
        type='text'
        name='email'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Name'
        type='text'
        name='name'
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label='Password'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label='Choose you profession'
        value={data.profession}
        name='profession'
        onChange={handleChange}
        defaultOption='Choose...'
        options={professionsList}
        error={errors.profession}
      />
      <RadioField
        options={[{ name: 'Male', value: 'male' }, { name: 'Female', value: 'female' }, {
          name: 'Other',
          value: 'other'
        }]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Choose your gender'

      />
      <MultiSelectField
        options={qualitiesList}
        name='qualities'
        defaultValue={data.qualities}
        onChange={handleChange}
        label='Choose your qualities'
        error={errors.qualities}
      />
      <CheckBoxField
        name='license'
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Confirm the <a>license</a>
      </CheckBoxField>
      <button
        className='btn btn-primary w-100 mx-auto'
        type='submit'
        disabled={!isValid}
      >Submit
      </button>
    </form>
  </>);
};

export default RegisterForm;
