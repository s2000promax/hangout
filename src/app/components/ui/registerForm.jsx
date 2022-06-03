import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useProfessions } from '../../hooks/useProfession';
import { useQuality } from '../../hooks/useQuality';

const RegisterForm = () => {
  let { professions } = useProfessions();
  let { qualities } = useQuality();

  const [data, setDate] = useState({
    email: '', password: '', profession: '', sex: 'male', qualities: [], license: false
  });
  const [errors, setErrors] = useState({});

  if (professions) {
    const professionsList = Object.keys(professions).map((professionName) => ({
      label: professions[professionName].name, value: professions[professionName]._id
    }));
    professions = professionsList;
  }

  if (qualities) {
    const qualitiesList = Object.keys(qualities).map((optionName) => ({
      label: qualities[optionName].name, value: qualities[optionName]._id, color: qualities[optionName].color
    }));
    qualities = qualitiesList;
  }

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: 'Email is required' }, isEmail: { message: 'Email incorrect' }
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

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value, name: qualities[quality].label, color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      return;
    }
    const { profession, qualities } = data;
    console.log({
      ...data, profession: getProfessionById(profession), qualities: getQualities(qualities)
    });
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
      <SelectField
        label='Choose you profession'
        value={data.profession}
        name='profession'
        onChange={handleChange}
        defaultOption='Choose...'
        options={professions}
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
        options={qualities}
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
