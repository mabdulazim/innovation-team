import React, { useState } from 'react';

export const useForm = (options: any) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState<{ [k: string]: string }>({});  
  const isDisabled = Object.keys(errors).length > 0 || isFirstRender || Object.values(data).some((value: any) => value === '');  

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    isFirstRender && setIsFirstRender(false);
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData({ ...data, [e.target.name]: v });
    if (errors[e.target.name]) {
      const tempErrors = errors;
      delete tempErrors[e.target.name]
      setErrors(tempErrors);
    }
  };

  const handleSubmit = () => {
    // e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: { [k: string]: any } = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        const pattern = validation?.pattern || validation?.email;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom =
          validation?.custom || validation?.password || validation?.length;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }
      }

      if (!valid) {
        console.log('newErrors', newErrors);
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit(data);
    }
  };

  return {
    data,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    isDisabled
  };
};

export const validations = {
  required: {
    value: true,
    message: 'This field is required',
  },
  pattern: (value: RegExp, message: string) => ({
    value,
    message,
  }),
  length: (number: number, message: string) => ({
    isValid: (value: string) => value?.length === number,
    message,
  }),
  // eslint-disable-next-line @typescript-eslint/ban-types
  custom: (func: Function, message: string) => ({
    isValid: func,
    message,
  }),
  email: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'invalid email address',
  },
  password: {
    isValid: (value: string) => value?.length >= 6,
    message: 'Password must be at least 6 characters',
  },
};
