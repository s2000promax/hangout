import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  return (
    <div className='mb-4'>
      <label htmlFor='email'>{label}</label>
      <div className='input-group has-validation'>
        <input
          className={getInputClasses()}
          type={showPassword ? 'text' : type}
          name={name}
          placeholder={placeholder}
          id={name}
          value={value}
          onChange={handleChange}
        />
        {
          type === 'password' && (
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={toggleShowPassword}
            >
              <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
            </button>
          )
        }
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
