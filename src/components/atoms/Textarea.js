import React from 'react';
import propTypes from 'prop-types';

export default function Textarea({
  value,
  error,
  name,
  onChange,
  placeholder,
  labelName,
  inputClassName,
}) {
  return (
    <div className="flex flex-col mb-2">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            'font-semibold mb-2',
            error ? 'text-red-600' : 'text-zinc-700',
          ].join(' ')}>
          {labelName}
        </label>
      )}
      <textarea
        name={name}
        onChange={onChange}
        rows="3"
        className={[
          'text-zinc-800  font-medium  block w-full sm:text-sm border-gray-200 rounded-md py-3 placeholder-opacity-50 placeholder-gray-500 transition-all duration-300 ease-in-out',
          error
            ? 'focus:ring-red-600 focus:border-red-500'
            : 'focus:ring-blue-600 focus:border-sky-500',
          inputClassName,
        ].join(' ')}
        value={value}
        placeholder={placeholder ?? 'Please change placeholder'}></textarea>
      <span className="text-red-600 pt-2">{error}</span>
    </div>
  );
}

Textarea.propTypes = {
  error: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
};
