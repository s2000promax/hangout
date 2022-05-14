import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ options, defaultValue, onChange, name, label }) => {
  const optionsArray = !Array.isArray(options) && typeof options === 'object'
    ? Object.values(options)
    : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
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
        className="basic-multi-select"
        classNamePrefix="select"
        defaultValue={defaultValue}
        onChange={handleChange}
        name={name}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.array,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
};

export default MultiSelectField;
