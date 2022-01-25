import React from 'react';
import propTypes from 'prop-types';

export default function Textarea({
  value,
  error,
  name,
  handlerChange,
  placeholder,
  labelName,
  inputClassName,
  addClassRoot,
  addClassLabel,
  readOnly = false,
  disabled = false,
  handlerInput,
}) {
  return (
    <div className={['flex flex-col mb-2', addClassRoot]}>
      {labelName && (
        <label
          htmlFor={name}
          className={[
            'font-semibold mb-2',
            addClassLabel,
            error ? 'text-red-600' : 'text-zinc-700',
          ].join(' ')}>
          {labelName}
        </label>
      )}
      <textarea
        name={name}
        onChange={handlerChange}
        onInput={handlerInput}
        rows="3"
        disabled={disabled}
        readOnly={readOnly}
        className={[
          'text-zinc-800 appearance-none disabled:bg-opacity-40 font-medium  block w-full sm:text-sm border-zinc-300 rounded-md py-3 placeholder-opacity-50 placeholder-zinc-500 transition-all duration-300 ease-in-out ',
          error
            ? 'focus:ring-red-600 focus:border-red-500'
            : 'focus:ring-blue-600 focus:border-blue-500',
          disabled ? 'bg-zinc-200 cursor-not-allowed' : 'bg-white',
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
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
};
