import React from 'react';
import PropTypes from 'prop-types';

const TextareaField = ({ label, name, placeholder, value, rows, onChange, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <textarea
          className={getInputClasses()}
          name={name}
          placeholder={placeholder}
          id={name}
          value={value}
          rows={rows}
          onChange={handleChange}
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  );
};
TextareaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  rows: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextareaField;
