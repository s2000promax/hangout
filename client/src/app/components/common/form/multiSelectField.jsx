import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, defaultValue, onChange, name, label, error }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.values(options)
    : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  const getInputClasses = () => {
    return 'basic-multi-select' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label className="form-label">
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        className={getInputClasses()}
        classNamePrefix="select"
        defaultValue={defaultValue}
        onChange={handleChange}
        name={name}
      />
      {error && <div className="invalid-feedback">
        {error}
      </div>}
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string

};

export default MultiSelectField;
