import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';

const Login = () => {
  const [data, setDate] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

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
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const handleChange = ({ target }) => {
    setDate(prevState => ({
      ...prevState,
      [target.name]: target.value
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

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='mb-4'>Login</h3>
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
            <button
              className='btn btn-primary w-100 mx-auto'
              type='submit'
              disabled={!isValid}
            >Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
