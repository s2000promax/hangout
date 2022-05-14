import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
// import * as yup from 'yup';

const LoginForm = () => {
  const [data, setDate] = useState({
    email: '', password: '', stayOn: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  /* const validateScheme = yup.object().shape({
    password: yup.string().required('Password is required')
      .matches(/(?=.[A-Z])/, 'Password must have one capital symbol')
      .matches(/(?=.*[0-9])/, 'Password must have one digit')
      .matches(/(?=.*[!@#$%^&*])/, 'Password must have one special symbol')
      .matches(/(?=.{8,})/, 'Password must have 8 symbols more'),
    email: yup.string().required('Email is required').email('Email incorrect')
  }); */
  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' },
      isEmail: { message: 'Email incorrect' }
    },
    password: {
      isRequired: { message: 'Password is required' },
      isCapitalSymbol: { message: 'Password must have one capital symbol' },
      isContainDigit: { message: 'Password must have one digit' },
      min: { message: 'Password must have 8 symbols more', value: 8 }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    /* validateScheme.validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message })); */
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
    if (isValid) {
      console.log(data);
    }
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
        label='Password'
        type='password'
        name='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        name='stayOn'
        value={data.stayOn}
        onChange={handleChange}
      >
        Stay On
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

export default LoginForm;
